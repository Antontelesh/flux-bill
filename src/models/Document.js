import {assign, map, pluck, reduce, compact} from 'lodash';
import moneyFormat from '../utils/moneyFormat';
import Good from './Good';
import DocumentActions from '../actions/Document';

function sum (a = 0, b = 0) {
  return a + b;
}

function defaultDocument () {
  return {
    number: '',
    date_created: '',
    goods: []
  }
}

function createGoods (goods) {
  return map(goods, function (item) {
    return new Good(item);
  });
}

export default class Document {

  constructor(params = {}) {
    assign(this, defaultDocument(), params);
    this.setGoods(params.goods);
  }

  getTitle() {
    return compact([
      'Bill',
      this.number ? `# ${this.number}` : null,
      this.date_created ? `from ${this.date_created}` : null,
      `on ${moneyFormat(this.amount)}`
    ]).join(' ');
  }

  setNumber(number) {
    this.number = number;
    DocumentActions.documentChanged(this);
  }

  setDateCreated(value) {
    this.date_created = value;
    DocumentActions.documentChanged(this);
  }

  setGoods(goods) {
    this.goods = createGoods(goods);
    this.amount = this.calculateAmount();
    DocumentActions.documentChanged(this);
  }

  calculateAmount() {
    return reduce(pluck(this.goods, 'total'), sum) || 0;
  }

}
