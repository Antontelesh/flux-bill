import Reflux from 'reflux';
import DocumentListActions from '../actions/DocumentList';
import DocumentAPI from '../api/Document';
import Document from '../models/Document';
import {map, filter} from 'lodash';
import isSubstring from '../utils/isSubstring';

var documents = [],
    loading = false,
    titleFilter = '';

function instantiateDocuments (docs) {
  return map(docs, function (doc) {
    return new Document(doc);
  });
}

function titleMatch (doc) {
  return isSubstring(titleFilter, doc.getTitle());
}

export default Reflux.createStore({

  listenables: DocumentListActions,

  onFetchDocuments() {
    loading = true;
    DocumentAPI
      .getAll()
      .then(DocumentListActions.receivedDocuments)
    this.trigger();
  },

  onReceivedDocuments(docs) {
    documents = instantiateDocuments(docs);
    loading = false;
    this.trigger(documents);
  },

  onSetTitleFilter(title) {
    titleFilter = title;
    this.trigger();
  },

  getAll() {
    return documents;
  },

  getFiltered() {
    return filter(documents, titleMatch);
  },

  getTitleFilter() {
    return titleFilter;
  },

  isLoading() {
    return loading;
  }

});
