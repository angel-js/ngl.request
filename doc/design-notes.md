Design notes
============

Keep It Simple

Avoid optional parameters
-------------------------

Do not handle url sections like `/:id?`

Query string parameters
-----------------------

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
