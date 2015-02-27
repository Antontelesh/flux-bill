import React from 'react';
import {assign, map} from 'lodash';
import Input from './Input';
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

  render() {

    return (
      <li>
        <Input
          type="text"
          value={this.state.item.title}
          onChange={this.setter('title')} />
        <Input
          type="text"
          value={this.state.item.quantity}
          parsers={[toFloat]}
          formatters={[toFloatStr]}
          onChange={this.setter('quantity')} />
        <Input
          type="text"
          parsers={[toFloat]}
          formatters={[toFloatStr]}
          value={this.state.item.price}
          onChange={this.setter('price')} />
        <Input
          type="text"
          parsers={[toFloat]}
          formatters={[toFloatStr]}
          value={this.state.item.total}
          onChange={this.setter('total')} />
      </li>
    )
  }

});
