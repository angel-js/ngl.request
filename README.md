ngl.request
===========

Angular 1.x `$http` service wrapper

Features
--------

  * Centralize endpoint configurations with placeholders and query strings
  * Provide all the HTTP methods for each endpoint
  * Provide a promise interface from every HTTP method

Supported HTTP methods
----------------------

  * GET (`request.foo().get()`)
  * POST (`request.foo().post()`)
  * PUT (`request.foo().put()`)
  * DELETE (`request.foo().delete()`)

Usage
-----

Having a RESTful backend like the following:

```
GET     /item    Item.all()
POST    /item    Item.create()   Create with auto-generated id
POST    /item/1  Item.create()   Create with id "1"
GET     /item/1  Item.show()
PUT     /item/1  Item.update()
DELETE  /item/1  Item.destroy()
```

Expose a service with the configured resources

```js
angular.module('app.request', ['ngl.request'])

.factory('appRequest', function (nglRequest) {
  return nglRequest({
    context: 'api',
    endpoints: {
      items: '/item',
      item: '/item/:id'
    }
  });
});
```

Use the exposed service where needed

```js
angular.module('app', ['app.request'])

.controller('home', function (appRequest) {
  appRequest.items().get({ maxResults: 10, page: 2 });
  appRequest.item({ id: 123 }).get();
  appRequest.item({ id: 123 }).post({ name: 'foo' });
  appRequest.item({ id: 123 }).delete();
});
```

Design notes
------------

Keep It Simple

### Avoid optional parameters

Do not handle url sections like `/:id?`

### Query string parameters

  * Should be reserved for **search** filters
  * Should be optional

That simplifies the API:

  * Url parameters (`:id`) will be defined in the resource's single argument
  
    ```js
    appRequest.item({ id: 123 })
    ```
  
  * `.get()` single argument will be treated as query string object
  * `.post()` or `.put()` single argument will be treated as data payload

References
----------

*   https://github.com/flatiron/restful#core-http-rest-mappings
*   http://expressjs.com/4x/api.html#app.use
*   https://docs.angularjs.org/api/ngRoute/service/$route#example
    (`script.js`)
*   https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
*   https://github.com/tj/page.js#matching-paths
*   https://github.com/pillarjs/path-to-regexp
