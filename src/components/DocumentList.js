import React from 'react';
import Storage from '../utils/Storage';
import {map} from 'lodash';
import {Link} from 'react-router';

export default React.createClass({

  renderDocument(doc) {
    return (
      <li key={doc.id}>
        <Link to="form" params={doc}>Bill #{doc.number} from {doc.date_created} on {doc.amount}</Link>
      </li>
    );
  },

  render() {
    var documents = map(Storage.read('documents'), this.renderDocument);
    return <ul>{documents}</ul>
  }

});
