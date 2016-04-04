angular.module('ngl.request', [
  'ngl.fp', // nglMap, nglPartial
  'ngl.url' // nglQueryString, nglInterpolate
])

.factory('nglRequest', function ($http, nglMap, nglPartial, nglQueryString, nglInterpolate) {
  'use strict';

  var url = function (path, qs) {
    return path + nglQueryString(qs);
  };

  var get = function (url, qs) {
    return $http.get(url + nglQueryString(qs));
  };

  var post = function (url, payload) {
    return $http.post(url, payload);
  };

  var put = function (url, payload) {
    return $http.put(url, payload);
  };

  var del = function (url) {
    return $http.delete(url);
  };

  var requestMethods = function (urlTemplate, urlParams) {
    var urlPath = nglInterpolate(urlTemplate, urlParams);

    return {
      url: nglPartial(url, urlPath),
      get: nglPartial(get, urlPath),
      post: nglPartial(post, urlPath),
      put: nglPartial(put, urlPath),
      delete: nglPartial(del, urlPath)
    };
  };

  var request = function (config) {
    return nglMap(function (item) {
      return nglPartial(requestMethods, item);
    }, config.endpoints);
  };

  return request;
});
