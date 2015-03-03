import React from 'react';
import {assign, map} from 'lodash';
import GoodsActions from '../actions/Goods';
import Input from './Input';
import NumericFloatInput from './NumericFloatInput';
import capitalize from '../utils/capitalize';
import toFloat from '../utils/toFloat';
import toFloatStr from '../utils/toFloatStr';

export default React.createClass({

  getInitialState() {
    return assign({}, this.props);
  },

  setter(param) {
    var method = `set${capitalize(param)}`;
    return this.state.item[method].bind(this.state.item);
  },

  remove(event) {
    event.preventDefault();
    GoodsActions.removeItem(this.state.item);
  },

  render() {

    return (
      <li>
        <Input
          type="text"
          value={this.state.item.title}
          placeholder="Title"
          onChange={this.setter('title')} />
        <NumericFloatInput
          type="text"
          value={this.state.item.quantity}
          placeholder="1"
          defaultValue={1}
          onChange={this.setter('quantity')} />
        <NumericFloatInput
          type="text"
          defaultValue={0}
          placeholder="0,00"
          value={this.state.item.price}
          onChange={this.setter('price')} />
        <NumericFloatInput
          type="text"
          defaultValue={0}
          value={this.state.item.total}
          placeholder="0,00"
          onChange={this.setter('total')} />
        <button onClick={this.remove}>×</button>
      </li>
    )
  }

});
