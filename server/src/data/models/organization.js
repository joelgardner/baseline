var bookshelf = require('../db').bookshelf;
var utils = require('../../services/utils'),
  Dates = utils.Dates;

var Organization =
exports.Model = bookshelf.Model.extend({
  tableName: 'organizations'
});

exports.create = function(companyName) {
  console.log("here?");
  return Organization.forge({
    name:           companyName,
    datecreated:      Dates.now()
  })
  .save();
};
