import React from 'react';
import pipe from '../utils/pipe';
import {isFunction, isUndefined} from 'lodash';

export default {

  getDefaultProps() {
    return {
      type: 'text',
      value: ''
    }
  },

  getInitialState() {
    return {
      value: this.formatValue(this.props.value)
    }
  },

  parseValue(value) {
    if (value === '' && !isUndefined(this.props.defaultValue)) {
      return this.props.defaultValue;
    }

    return pipe(value, this.parsers);
  },

  formatValue(value) {
    if (this.props.defaultValue === value) {
      return '';
    }

    return pipe(value, this.formatters);
  },

  runInterceptors(interceptors = [], newValue, oldValue) {

    var len = interceptors.length,
        interceptor;

    while (len) {
      len--;
      interceptor = interceptors[0];
      newValue = interceptor(newValue, oldValue);
    }

    return newValue;
  },

  componentWillMount() {
    this.parsers = (this.parsers || []).concat(this.props.parsers || []);
    this.formatters = (this.formatters || []).concat(this.props.formatters || []);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.parseValue(this.state.value)) {
      this.setState({value: this.formatValue(nextProps.value)});
    }
  },

  onChange(event) {
    var value = this.runInterceptors(this.changeInterceptors, event.target.value, this.state.value);
    this.setState({value: value});

    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.parseValue(value));
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
