var db = require('../db'),
  bookshelf = db.bookshelf,
  handleDatabaseException = db.handleDatabaseException;
var utils = require('../../services/utils'),
  Dates = utils.Dates,
  Security = utils.Security,
  Validation = utils.Validation,
  _ = utils._;
var Organization = require('./organization'),
  Contact = require('./contact');

/**
  * Users
  */

var User =
exports.Model = bookshelf.Model.extend({
  tableName: 'users',
  toJSON: function() {
    var json = bookshelf.Model.prototype.toJSON.call(this);
    delete json.password;
    delete json.datecreated;
    delete json.datemodified;
    delete json.passwordresetexpirydate;
    delete json.passwordresetkey;
    delete json.passwordresetanswer;
    delete json.passwordresetquestion;
    return json;
  }
});

exports.findOneByEmail = email => {
  return User.forge({ email : email })
    .fetch();
};

exports.login = localAuth => new Promise((resolve, reject) => {
  var outputs = {};

  /**
  get the user with this email
  **/
  _.capture(
    exports.findOneByEmail(localAuth.email),
    outputs,
    'user')

  /**
  if a user with matching email was found, compare passwords
  **/
  .then(user => user
    ? Security.comparePassword(localAuth.password, user.get('password'))
    : reject('Invalid login credentials'))

  /**
  if the passwords match, return the user
  **/
  .then(isMatch => isMatch
    ? resolve(outputs.user.toJSON())
    : reject('Invalid login credentials'))

  /**
  handle errors
  **/
  .catch(e => {
    console.log('user.login exception: ' + e);
    reject(e);
  });
});

exports.signup = user => new Promise((resolve, reject) => {
  // capture intermediate promise results
  var captured = {};

  // search for a user with that email
  return exports.findOneByEmail(user.email)

    // if the email already exists, send back a validation message to the client.
    // otherwise, create an Organization based on the given company name
    .then(_.capture(existing => existing
      ? reject({ email: 'Email already exists.' })
      : Organization.create(user.companyName),
      captured, 'organization'))

    // next, we need a Contact for the user
    .then(_.capture(() => Contact.create({
        companyname: user.companyName,
        email: user.email,
        datecreated: Dates.now()
      }), captured, 'contact'))

    // hash the given password
    .then(() => Security.hashPassword(user.password))

    // finally, create our user
    .then(hashedPassword => User.forge({
        email: user.email,
        password: hashedPassword,
        contactid: captured.contact.id,
        organizationid: captured.organization.id,
        createdat: Dates.now()
      }).save())

    .then(resolve, handleDatabaseException(reject))
    .catch(reject);
});

exports.parse = obj => _.parse(obj, [
  'email',
  'password',
  'companyName'
]);

exports.validateSignup = user => Validation.validate([
  Validation.v('email',     Validation.isNonempty(user.email),    'Email is required.'),
  Validation.v('email',     Validation.emailIsValid(user.email),  'Email must be valid.'),
  Validation.v('password',  Validation.isNonempty(user.password), 'Password is required.')
]);
