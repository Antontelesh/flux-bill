import {assign} from 'lodash';
import GoodsActions from '../actions/Goods';

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
    return (this.total / this.price).toFixed(2);
  }

  calculateTotal() {
    var value = (this.quantity || 0) * (this.price || 0);
    return value.toFixed(2);
  }

}
