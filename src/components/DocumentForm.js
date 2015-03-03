import React from 'react';
import {assign, map} from 'lodash';
import GoodsForm from './GoodsForm';
import Input from './Input';

export default React.createClass({

  getInitialState() {
    return assign({}, this.props);
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.document);
  },

  render() {

    var doc = this.state.document;

    return (
      <form onSubmit={this.handleSubmit}>

        <div className="control-group">
          <label>Bill #</label>
          <Input
            value={this.state.document.number}
            autoselect="autoselect"
            placeholder="Bill number"
            onChange={doc.setNumber.bind(doc)} />
          <label>from</label>
          <Input
            value={this.state.document.date_created}
            placeholder="Date created"
            onChange={doc.setDateCreated.bind(doc)} />
        </div>

        <GoodsForm goods={this.state.document.goods} />

        <button type="submit" disabled={this.props.saving ? 'disabled' : null}>{this.props.saving ? 'Saving...' : 'Submit'}</button>
      </form>
    )
  }

});
