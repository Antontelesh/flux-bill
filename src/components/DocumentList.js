require('../scss/DocumentList.scss');

import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';
import {map} from 'lodash';

import DocumentListStore from '../stores/DocumentListStore';
import DocumentListActions from '../actions/DocumentList';

import Input from './Input';
import Loader from './Loader';
import Sidebar from './Sidebar';
import Content from './Content';

function getState () {
  return {
    documents: DocumentListStore.getFiltered(),
    loading: DocumentListStore.isLoading(),
    titleFilter: DocumentListStore.getTitleFilter()
  }
}

export default React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    this.listenTo(DocumentListStore, this._onChange);
    this.fetchDocuments();
  },

  fetchDocuments() {
    DocumentListActions.fetchDocuments();
  },

  renderDocument(doc) {
    return (
      <li key={doc.id}>
        <Link to="form" params={doc}>{doc.getTitle()}</Link>
      </li>
    );
  },

  setTitleFilter(title) {
    DocumentListActions.setTitleFilter(title);
  },

  render() {
    var documents = map(this.state.documents, this.renderDocument),
        list = documents.length
                ? <ul className="document-list">{documents}</ul>
                : null;

    if (!this.state.loading) {
      return (
        <div className="row">
          <Sidebar>
            <Input
              value={this.state.titleFilter}
              onChange={this.setTitleFilter} />
          </Sidebar>
          <Content>{list}</Content>
        </div>
      );
    }

    return <Loader />
  },

  _onChange() {
    this.setState(getState());
  }

});
