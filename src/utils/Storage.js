"use strict";

import {find, findIndex, remove as _remove, pick} from 'lodash';
import assoc from './assoc';
import propEq from './propEq';
import guid from './guid';

var storage = 'localStorage';
var key_field = 'id';

function read (collection) {
  var raw = window[storage][collection];
  return raw
          ? JSON.parse(raw)
          : [];
}

function write (collection, data) {
  window[storage][collection] = JSON.stringify(data);
}

function get (collection, query) {
  return find(read(collection), query);
}

function post (collection, data) {
  var item = assoc(key_field, guid(), data);
  return write(collection, read(collection).concat(item));
}

function put (collection, item) {
  var data = read(collection),
      index = findIndex(data, pick(item, [key_field]));

  if (index > -1) {
    data.splice(index, 1, item);
    write(collection, data);
  }
}

function remove (collection, item) {
  var data = read(collection);
  _remove(data, propEq(key_field, item[key_field]));
  write(collection, data);
}

function store (collection, item) {
  return item[key_field]
          ? put(collection, item)
          : post(collection, item);
}

export default {
  get: get,
  read: read,
  store: store,
  remove: remove
}

