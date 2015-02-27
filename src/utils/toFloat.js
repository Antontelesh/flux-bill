import {isNumber, isString} from 'lodash';

export default function (value) {
  var parsed, matches;

  if (isNumber(value) && !isNaN(value)) {
    return value
  }

  if (isString(value)) {
    parsed = value
      .replace(/[^\d\.,]/g, '')
      .replace(',', '.')
      .replace(/(\.\d*)\./g, '$1')
      .replace(/\D$/, '');
    if (/(^\d*$)|(^\d+(\.\d+)?$)/.test(parsed)) {
      return parseFloat(parsed)
    }
    return null
  }
}
