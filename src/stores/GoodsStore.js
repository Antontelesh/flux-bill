import Reflux from 'reflux';
import DocumentStore from './DocumentStore';
import DocumentActions from '../actions/Document';
import GoodsActions from '../actions/Goods';
import Good from '../models/Good';
import {assign, find, remove, pluck, reduce} from 'lodash';

var goods = [];

function sum (a, b) {
  return (Number(a || 0) + Number(b || 0)).toFixed(2);
}

export default Reflux.createStore({

  listenables: GoodsActions,

  onAddItem() {
    DocumentActions.goodsChanged(goods.concat(new Good()));
  },

  onRemoveItem(item) {
    remove(goods, {id: item.id});
    DocumentActions.goodsChanged(goods);
  },

  onItemChanged(item) {
    remove(goods, {id: item.id});
    DocumentActions.goodsChanged(goods.concat(item));
  },

  init() {
    this.listenTo(DocumentStore, this.update)
  },

  update() {
    var doc = DocumentStore.getDocument();
    goods = doc ? doc.goods : goods;
    this.trigger(goods);
  },

  getAll() {
    return goods;
  },

  getTotal() {
    var doc = DocumentStore.getDocument();
    return doc ? doc.amount : null;
  }

});
