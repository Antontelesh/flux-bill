import React from 'react';
import {State} from 'react-router';
import Reflux from 'reflux';
import DocumentStore from '../stores/DocumentStore';
import DocumentForm from './DocumentForm';
import Loader from './Loader';

export default React.createClass({

  mixins: [State, Reflux.ListenerMixin],

  getStateFromStores() {
    var document_id = this.getParams().id,
        doc = DocumentStore.getDocument();
    return {
      document_id: document_id,
      document: document_id
                ? doc
                : (doc || DocumentStore.createDocument())
    }
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  fetchDocument() {
    if (this.state.document_id) {
      DocumentActions.fetchDocument(this.state.document_id)
    }
  },

  componentDidMount() {
    this.listenTo(DocumentStore, this._onChange);
    this.fetchDocument();
  },

  handleFormSubmit() {
    console.log('document form submit', arguments);
  },

  render() {
    if (this.state.document) {
      return (
        <DocumentForm
          document={this.state.document}
          onSubmit={this.handleFormSubmit} />
      );
    }
    return <Loader/>
  },

  _onChange() {
    this.setState(this.getStateFromStores());
  }
});
