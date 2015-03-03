import React from 'react';
import Reflux from 'reflux';
import {map, sortBy} from 'lodash';
import moneyFormat from '../utils/moneyFormat';
import GoodsItem from './GoodsItem';
import GoodsStore from '../stores/GoodsStore';
import GoodsActions from '../actions/Goods';

function getStateFromStores () {
  return {
    goods: GoodsStore.getAll(),
    total: GoodsStore.getTotal()
  }
}

export default React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return getStateFromStores()
  },

  componentDidMount() {
    this.listenTo(GoodsStore, this._onChange);
  },

  addItem(event) {
    event.preventDefault();
    GoodsActions.addItem();
  },

  render() {

    var goods = map(sortBy(this.state.goods, 'id'), function (item) {
      return <GoodsItem item={item} key={item.id} />
    });

    return (
      <div className="goods-container">
        <ul className="goods">{goods}</ul>
        <div>Total: {moneyFormat(this.state.total)}</div>
        <button onClick={this.addItem}>Add Item</button>
      </div>
    )
  },

  _onChange() {
    this.setState(getStateFromStores())
  }

});
