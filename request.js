angular.module('request', [])

.factory('request', function ($http) {
  'use strict';

  var each = function (list, func) {
    for (var prop in list) { func(list[prop], prop); }
  };

  var partial = function (/* func, args... */) {
    var argv = [].slice.call(arguments);

    var func = argv.shift(),
        args = argv;
        
    var partiallyApplied = function () {
      return func.apply(null, [].concat.apply(args, arguments));
    };
    
    return partiallyApplied;
  };

  var queryString = function (obj) {
    var qs = '';

    each(obj, function (item, index) {
      qs += qs.length ? '&' : '?';
      qs += index + '=' + item;
    });

    return qs;
  };

  var interpolateUrl = function (template, params) {
    var url = template;

    each(params, function (item, index) {
      url = url.replace(':' + index, item);
    });

    return url;
  };

  var get = function (url, qs) {
    return $http.get(url + queryString(qs));
  };

  var post = function (url, payload) {
    return $http.post(url, payload);
  };

  var put = function (url, payload) {
    return $http.put(url, payload);
  };

  var delete = function (url) {
    return $http.delete(url);
  };

  var requestFactory = function (urlTemplate) {
    var request = function (urlParams) {
      var url = interpolateUrl(urlTemplate, urlParams);

      return {
        get: partial(get, url),
        post: partial(post, url),
        put: partial(put, url),
        delete: partial(delete, url)
      };
    };

    return request;
  };

  var request = function (config) {
    var requests = {};

    each(config.endpoints, function (item, index) {
      requests[index] = requestFactory(item);
    });

    return requests;
  };

  return request;
});
