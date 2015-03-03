import Reflux from 'reflux';
import DocumentActions from '../actions/Document';
import DocumentAPI from '../api/Document';
import Document from '../models/Document';
import {assign, find} from 'lodash';

var doc = undefined;
var saving = false;
var success = false;

export default Reflux.createStore({

  listenables: DocumentActions,

  onFetchDocument(document_id) {
    if (document_id) {
      return DocumentAPI
        .getDocument(document_id)
        .then(function onSuccess (doc) {
          DocumentActions.receivedDocument(new Document(doc));
        });
    }
    return DocumentActions.receivedDocument(new Document());
  },

  onReceivedDocument(received) {
    doc = received;
    this.trigger(doc);
  },

  onSaveDocument(doc) {
    saving = true;
    DocumentAPI
      .save(doc)
      .then(DocumentActions.savedDocument)
    this.trigger();
  },

  onSavedDocument() {
    saving = false;
    success = true;
    doc = undefined;
    this.trigger();
  },

  onExitForm() {
    doc = undefined;
    saving = false;
    success = false;
  },

  onGoodsChanged(goods) {
    if (doc) {
      doc.setGoods(goods);
      this.trigger(doc);
    }
  },

  onDocumentChanged(changed) {
    doc = changed;
    this.trigger(changed);
  },

  getDocument() {
    return doc;
  },

  isSaving() {
    return saving;
  },

  isSuccess() {
    return success;
  }

});
