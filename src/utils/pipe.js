import {flow} from 'lodash';

export default function pipe (value, mutators = []) {
  return flow.apply(null, mutators)(value);
}
