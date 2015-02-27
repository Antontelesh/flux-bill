import {curry} from 'lodash';

export default curry(function (key, value, obj) {
  return obj[key] === value;
});
