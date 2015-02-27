import React from 'react';
import pipe from '../utils/pipe';
import {isFunction} from 'lodash';

export default {

  getDefaultProps() {
    return {
      type: 'text',
      value: ''
    }
  },

  getInitialState() {
    return {
      value: this.props.value
    }
  },

  componentWillMount() {
    this.parsers = (this.parsers || []).concat(this.props.parsers || []);
    this.formatters = (this.formatters || []).concat(this.props.formatters || []);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== pipe(this.state.value, this.parsers)) {
      this.setState({value: pipe(nextProps.value, this.formatters)});
    }
  },

  onChange(event) {
    this.setState({value: event.target.value});

    if (isFunction(this.props.onChange)) {
      var value = pipe(event.target.value, this.parsers);
      this.props.onChange(value);
    }
  },

  render() {
    return (
      <input  type={this.props.type}
              value={this.state.value}
              onChange={this.onChange}
              onBlur={this.onBlur || null} />
    )
  }

}
