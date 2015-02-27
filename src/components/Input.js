import React from 'react';
import {isFunction} from 'lodash';

export default React.createClass({

  getDefaultProps() {
    return {
      type: 'text'
    }
  },

  getInitialState() {
    return {
      value: this.props.value
    }
  },

  onChange(event) {
    if (isFunction(this.props.onChange)) {
      this.props.onChange(event.target.value);
    }
  },

  render() {
    return (
      <input  type={this.props.type}
              value={this.props.value}
              onChange={this.onChange} />
    )
  }

});
