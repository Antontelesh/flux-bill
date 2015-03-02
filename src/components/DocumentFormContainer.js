import React from 'react';
import {State, Navigation} from 'react-router';
import Reflux from 'reflux';
import DocumentStore from '../stores/DocumentStore';
import DocumentActions from '../actions/Document';
import DocumentForm from './DocumentForm';
import Loader from './Loader';

export default React.createClass({

  mixins: [State, Navigation, Reflux.ListenerMixin],

  getStateFromStores() {
    return {
      saving: DocumentStore.isSaving(),
      success: DocumentStore.isSuccess(),
      document_id: this.getParams().id,
      document: DocumentStore.getDocument()
    }
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  fetchDocument() {
    DocumentActions.fetchDocument(this.state.document_id);
  },

  componentDidMount() {
    this.listenTo(DocumentStore, this._onChange);
    this.fetchDocument();
  },

  handleFormSubmit(doc) {
    DocumentActions.saveDocument(doc);
  },

  render() {
    if (this.state.success) {
      this.transitionTo('list');
      DocumentActions.exitForm();
      return null;
    }

    if (this.state.document) {
      return (
        <DocumentForm
          document={this.state.document}
          onSubmit={this.handleFormSubmit}
          saving={this.state.saving} />
      );
    }
    return <Loader/>
  },

  _onChange() {
    this.setState(this.getStateFromStores());
  }
});
