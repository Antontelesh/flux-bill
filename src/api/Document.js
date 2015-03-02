import q from 'q';
import Storage from '../utils/Storage';

function mockRequest (data, successful = true, time = 0) {
  var deferred = q.defer(),
      method = successful ? 'resolve' : 'reject';

  setTimeout(function() {
    deferred[method](data);
  }, time);

  return deferred.promise;
}

function resolve (data, time) {
  return mockRequest(data, true, time);
}

function reject (data, time) {
  return mockRequest(data, false, time);
}

export default {

  getDocument(id) {
    return resolve(Storage.get('documents', {id: id}))
  },

  save(doc) {
    Storage.store('documents', doc);
    return resolve(doc);
  }

}
