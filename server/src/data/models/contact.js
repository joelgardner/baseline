var db = require("../db"),
  bookshelf = db.bookshelf,
  handleDatabaseException = db.handleDatabaseException;
var utils = require("../../services/utils"),
  Dates = utils.Dates,
  Security = utils.Security,
  Validation = utils.Validation;

var Contact =
exports.Model = bookshelf.Model.extend({
  tableName: 'contacts'
});

exports.create = function(contact) {
  return Contact
    .forge(contact)
    .save();
};

/**
  * Parse out a contact object.  Generally used by route handlers.
  */
exports.parse = function(obj) {
  // parse properties from the object
  return [
    "email",
    "firstName",
    "companyName",
    "lastName",
    "address1",
    "address2",
    "postal",
    "state",
    "country"
  ].reduce(function(result, propName) {
    result[propName] = obj[propName];
    return result;
  }, {});
};

exports.validate = function(user) {
  var errors = {},
    hasErrors = false;

  // validate user.email
  if (!user.email) {
    hasErrors = true;
    errors.email = "Email is required.";
  }
  else if (!Validation.emailIsValid(user.email)) {
    hasErrors = true;
    errors.email = "Email must be valid.";
  }

  // if errors, reject, otherwise resolve with the user
  return hasErrors ? errors : user;
};
