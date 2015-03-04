import React from 'react';
import {assign, map} from 'lodash';
import GoodsForm from './GoodsForm';
import Input from './Input';

export default React.createClass({

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.document);
  },

  render() {

    var doc = this.props.document;

    return (
      <form onSubmit={this.handleSubmit}>

        <div className="control-group">
          <label>Bill # </label>
          <Input
            value={doc.number}
            autoselect="autoselect"
            placeholder="Bill number"
            onChange={doc.setNumber.bind(doc)} />
          <label> from </label>
          <Input
            value={doc.date_created}
            placeholder="Date created"
            onChange={doc.setDateCreated.bind(doc)} />
        </div>

        <GoodsForm goods={doc.goods} />

        <button
          type="submit"
          disabled={this.props.saving ? 'disabled' : null}>{this.props.saving ? 'Saving...' : 'Submit'}</button>
      </form>
    )
  }

});
