import React from 'react';
import {assign, map} from 'lodash';
import GoodsForm from './GoodsForm';

export default React.createClass({

  getInitialState() {
    return assign({}, this.props);
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.document);
  },

  handleChange(prop, event) {
    this.state.document[prop] = event.target.value;
    this.forceUpdate();
  },

  render() {

    return (
      <form onSubmit={this.handleSubmit}>

        <div className="form-horizontal">

          <div className="control-group">
            <label>Bill Number</label>
            <input
              value={this.state.document.number}
              onChange={this.handleChange.bind(this, 'number')} />
          </div>

          <div className="control-group">
            <label>Bill Date Created</label>
            <input
              value={this.state.document.date_created}
              onChange={this.handleChange.bind(this, 'date_created')} />
          </div>

        </div>

        <GoodsForm goods={this.state.document.goods} />

        <button type="submit">Submit</button>
      </form>
    )
  }

});
