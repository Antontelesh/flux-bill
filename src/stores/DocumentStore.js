import Reflux from 'reflux';
import DocumentActions from '../actions/Document';
import DocumentAPI from '../api/Document';
import {assign, find} from 'lodash';

var doc = undefined;

export default Reflux.createStore({

  listenables: DocumentActions,

  onFetchDocument(document_id) {
    DocumentAPI
      .getDocument(document_id)
      .then(DocumentActions.receivedDocument);
  },

  onReceivedDocument(doc) {
    this.registerDocument(doc);
    this.trigger(doc);
  },

  onGoodsChanged(goods) {
    if (doc) {
      doc.goods = goods;
      this.trigger(doc);
    }
  },

  registerDocument(received) {
    doc = received;
  },

  getDocument() {
    return doc;
  },

  createDocument() {
    return doc = {
      number: '',
      date_created: '',
      goods: []
    }
  }

});
