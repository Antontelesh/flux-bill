import {assign} from 'lodash';
import GoodsActions from '../actions/Goods';

function eventValue (event) {
  return event.target.value;
}

function defaultGood () {
  return {
    id: +new Date(),
    title: ''
  }
}

export default class Good {

  constructor(params) {
    assign(this, defaultGood(), params);
  }

  setTitle(event) {
    this.title = eventValue(event);
    GoodsActions.itemChanged(this);
  }

  setQuantity(event) {
    this.quantity = eventValue(event);
    this.total = this.calculateTotal();
    GoodsActions.itemChanged(this);
  }

  setPrice(event) {
    this.price = eventValue(event);
    this.total = this.calculateTotal();
    GoodsActions.itemChanged(this);
  }

  setTotal(event) {
    this.total = eventValue(event);
    this.quantity = this.calculateQuantity();
    GoodsActions.itemChanged(this);
  }

  calculateQuantity() {
    return (this.total / this.price).toFixed(2);
  }

  calculateTotal() {
    var value = (this.quantity || 0) * (this.price || 0);
    return value.toFixed(2);
  }

}
