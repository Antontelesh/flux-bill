"use strict";

import {find, findIndex, remove as _remove} from 'lodash';
import assoc from './assoc';
import propEq from './propEq';

var storage = 'localStorage';
var key_field = 'id';

function nextId () {
  return new Date().valueOf().toString();
}

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
  var item = assoc(key_field, nextId(), data);
  return write(collection, read(collection).concat(item));
}

function put (collection, item) {
  remove(collection, item);
  post(collection, item);
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

