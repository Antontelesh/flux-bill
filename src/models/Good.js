import {assign, isEmpty} from 'lodash';
import GoodsActions from '../actions/Goods';
import toFloat from '../utils/toFloat';
import guid from '../utils/guid';

function defaultGood () {
  return {
    id: guid(),
    title: '',
    quantity: 1,
    price: 0,
    total: 0
  }
}

export default class Good {

  constructor(params) {
    assign(this, defaultGood(), params);
  }

  setTitle(title) {
    this.title = title
    GoodsActions.itemChanged(this);
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.total = this.calculateTotal();
    GoodsActions.itemChanged(this);
  }

  setPrice(price) {
    this.price = price;
    this.total = this.calculateTotal();
    GoodsActions.itemChanged(this);
  }

  setTotal(total) {
    this.total = total;
    this.quantity = this.calculateQuantity();
    GoodsActions.itemChanged(this);
  }

  calculateQuantity() {
    return toFloat((this.total / this.price).toFixed(2));
  }

  calculateTotal() {
    var value = (this.quantity || 0) * (this.price || 0);
    return toFloat(value.toFixed(2));
  }

  isEmpty() {
    return isEmpty(this.title);
  }

}
