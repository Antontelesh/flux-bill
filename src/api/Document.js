import q from 'q';
import Storage from '../utils/Storage';

export default {

  getDocument(id) {
    var deferred = q.defer();
    setTimeout(function () {
      var doc = Storage.get('documents', {id: id});
      deferred.resolve({
        document: doc
      });
    }, 1000);
    return deferred.promise;
  }

}
