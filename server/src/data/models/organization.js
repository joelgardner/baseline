var bookshelf = require('../db').bookshelf;
var utils = require('../../services/utils'),
  Dates = utils.Dates;

var Organization =
exports.Organization = bookshelf.Model.extend({
  tableName: 'organizations'
});

exports.create = function(companyName) {
  return Organization.forge({
    name:           companyName,
    subscriptionstatusid:   1,
    datecreated:      Dates.now()
  })
  .save();
};
