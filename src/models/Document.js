import {assign, map, pluck, reduce, compact, keys, reject} from 'lodash';
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

function goodIsEmpty (item) {
  return item.isEmpty();
}

export default class Document {

  constructor(params = {}) {
    assign(this, defaultDocument(), params);
    this.setGoods(params.goods);

    if (!this.goods.length) {
      this.setGoods(new Array(3));
    }
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

  format() {
    return reduce(keys(this), function (result, key) {
      if (key === 'goods') {
        result[key] = reject(this[key], goodIsEmpty);
      } else {
        result[key] = this[key];
      }
      return result;
    }, {}, this);
  }

}
