import {assign, map, pluck, reduce, compact} from 'lodash';
import Good from './Good';

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
      `on ${this.amount}`
    ]).join(' ');
  }

  setGoods(goods) {
    this.goods = createGoods(goods);
    this.amount = this.calculateAmount();
  }

  calculateAmount() {
    return reduce(pluck(this.goods, 'total'), sum) || 0;
  }

}
