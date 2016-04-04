ngl.request
===========

Wrapper for Angular 1.x `$http` service

### Features

  * Centralize endpoint configurations with placeholders and query strings
  * Provide all the HTTP methods for each endpoint
  * Provide a promise interface from every HTTP method

Usage
-----

Having a RESTful backend like the following...

```
GET     /api/item      List all
POST    /api/item      Create with auto-generated id
POST    /api/item/:id  Create with id
GET     /api/item/:id  Show id
PUT     /api/item/:id  Update id
DELETE  /api/item/:id  Delete id
```

First, expose a service with the configured resources

```js
angular.module('app.request', ['ngl.request'])

.factory('appRequest', function (nglRequest) {
  return nglRequest({
    context: '/api',
    endpoints: {
      items: '/item',
      item: '/item/:id'
    }
  });
});
```

Then, use that service where needed

```js
angular.module('app', ['app.request'])

.controller('home', function (appRequest) {
  appRequest.items().get({ maxResults: 10, page: 2 });
  appRequest.item({ id: 123 }).get();
  appRequest.item({ id: 123 }).post({ name: 'foo' });
  appRequest.item({ id: 123 }).delete();
});
```

Install
-------

    bower install --save ngl.request

### Include the sources

```html
<script src="bower_components/ngl.fp/dist/ngl.fp.min.js"></script>
<script src="bower_components/ngl.url/dist/ngl.url.min.js"></script>
<script src="bower_components/ngl.request/dist/ngl.request.min.js"></script>
```

### Load the angular module

Add `ngl.request` to your app dependencies

```js
angular.module('app', [ 'ngl.request' ]);
```

API
---

### Supported HTTP methods

  * GET (`request.foo().get()`)
  * POST (`request.foo().post()`)
  * PUT (`request.foo().put()`)
  * DELETE (`request.foo().delete()`)

Additional documentation
------------------------

  * [Design notes](doc/design-notes.md)
