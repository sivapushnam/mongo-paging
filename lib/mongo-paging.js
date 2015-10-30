(function () {
  'use strict';

  /**
   * Global Dependency
   */
  var async = require('async');

  function Paging(options, callback) {
    /*jshint validthis:true */
    var query, skipFrom, sortBy, columns, populate, slice, q, model = this;
    columns = options.columns || null;
    sortBy = options.sortBy || null;
    populate = options.populate || null;
    callback = callback || function () {
      };
    slice = options.slice;
    q = options.q;
    var pageNumber = options.page || 1;
    var resultsPerPage = options.limit || 10;
    skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    if (slice) {
      query = model.findOne(q).slice(slice, [skipFrom, resultsPerPage]);
    } else {
      query = model.findOne(q);
    }

    if (columns !== null) {
      query = query.select(options.columns);
    }

    if (!slice) {
      query = query.skip(skipFrom).limit(resultsPerPage);
    }

    if (sortBy !== null) {
      query.sort(sortBy);
    }
    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach(function (field) {
          query = query.populate(field);
        });
      } else {
        query = query.populate(populate);
      }
    }
    async.parallel({
      results: function (callback) {
        query.exec(callback);
      },
      count: function (callback) {
        if (slice) {
          model.findOne(q, function (err, result) {
            callback(err, result[slice].length);
          })
        } else {
          model.count(q, function (err, count) {
            callback(err, count);
          });
        }

      }
    }, function (error, data) {
      if (error) {
        return callback(error);
      }
      callback(null, data.results, Math.ceil(data.count / resultsPerPage) || 1, data.results, data.count);
    });
  }

  module.exports = function (schema) {
    schema.statics.Paginate = Paging;
  };
}());