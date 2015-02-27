import {isNumber} from 'lodash';

export default function toFloatStr (value) {

  if (isNumber(value) && !isNaN(value)) {
    return parseFloat(parseFloat(value.toFixed(3)).toFixed(2))
      .toString()
      .replace(/\./g, ',');
  }

}
