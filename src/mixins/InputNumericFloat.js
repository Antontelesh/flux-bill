import toFloatStr from '../utils/toFloatStr';
import toFloat from '../utils/toFloat';

function onChangeNumericFloat (newValue, oldValue) {
  var pattern = /(^\d+(,\d*)?$)|(^\d*$)/;

  if (pattern.test(newValue)) {
    return newValue;
  }

  return oldValue;
}

export default {
  parsers: [toFloat],
  formatters: [toFloatStr],
  changeInterceptors: [onChangeNumericFloat]
}
