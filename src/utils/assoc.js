import {curry, clone} from 'lodash';

export default curry(function (key, value, obj) {
  var copy = clone(obj);
  copy[key] = value;
  return copy;
});
