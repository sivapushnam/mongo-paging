
# mongo-paging
Mongo-paging will allows to paginate the mongo document and subdocuments in a collections.

## Index

## Install

```bash
git clone git@github.com:sivapushnam/mongo-paging.git
```


## Usage

This plugin must first be added to a schema:

```js

var mongoPaging = require('mongo-paging');

MySchema.plugin(mongoPaging);

```

`MySchema` will have a new function called `Paginate` (e.g. `MySchema.paginate()`).

### MySchema.paginate(options, callback)

**Arguments**

* `options` - An object with options for the [Mongoose][mongoose] query, such as sorting and population
  -	`q` 		- An object for the [Mongoose][mongoose] query.
  - `page` 		- Default: `1`
  - `limit` 	- Default: `10`
  - `columns` 	- Default: `null`
  - `sortBy` 	- Default: `null`
  - `populate` 	- Default: `null`
  -	`slice`		- Default: `null`
* `callback(err, results, pageCount, itemCount, resultsCount)` - A callback which is called once pagination results are retrieved, or when an error has occurred.

**Examples**

```js

// basic example usage of `mongo-paging`
// querying for `all` {} items in `MySchema`
// paginating by second page, 10 items per page (10 results, page 2)

var mongoPaging = require('mongo-paging');

MySchema.plugin(mongoPaging);

MySchema.paginate({
 q:{}, page: 2, limit: 10
}, callback);

```

```js

// advanced example usage of `mongo-paging`
// querying for `{ columns: 'title', { populate: 'collection_ref' }, { sortBy : { title : -1 } }` items in `MySchema`
// paginating by second page, 10 items per page (10 results, page 2)
//var options = {
//        q: {},
//        page: page,
//        limit: limit,
//        populate: [
//          {
//            path: 'comments.user',
//            select: '_id username firstname lastname'
//          }
//        ],
//        columns: 'comments.user',
//        slice: 'comments',
//        sortBy: sortView
//      };
//      options.q = {_id: groupId};
MySchema.paginate(
   options,
  callback
);

## Tests



## Contributors




## License

[MIT][license-url]
