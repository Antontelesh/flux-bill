import React from 'react';
import {assign, map} from 'lodash';
import capitalize from '../utils/capitalize';

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
        <input
          type="text"
          value={this.state.item.title}
          onChange={this.setter('title')} />
        <input
          type="text"
          value={this.state.item.quantity}
          onChange={this.setter('quantity')} />
        <input
          type="text"
          value={this.state.item.price}
          onChange={this.setter('price')} />
        <input
          type="text"
          value={this.state.item.total}
          onChange={this.setter('total')} />
      </li>
    )
  }

});
