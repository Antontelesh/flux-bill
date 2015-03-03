require('../scss/DocumentList.scss');

import React from 'react';
import Reflux from 'reflux';
import {Link, Navigation} from 'react-router';
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

  mixins: [Navigation, Reflux.ListenerMixin],

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

  renderSidebar() {
    return (
      <Sidebar>
        <div className="control-group">
          <Link to="form_create">Create Document</Link>
        </div>
        <div className="control-group">
          <Input
            className="input-block-level"
            placeholder="Search bills by title"
            value={this.state.titleFilter}
            onChange={this.setTitleFilter} />
        </div>
      </Sidebar>
    );
  },

  render() {
    this.replaceWith('list', {}, this.state.titleFilter ? {title: this.state.titleFilter} : {});

    var documents = map(this.state.documents, this.renderDocument),
        list = documents.length
                ? <ul className="document-list">{documents}</ul>
                : null;

    if (!this.state.loading) {
      return (
        <div className="row">
          {this.renderSidebar()}
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
