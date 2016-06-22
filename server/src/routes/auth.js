var User = require('../data/models/user');
var utils = require('../services/utils'),
  _ = utils._,
  Security = utils.Security;

// the routes defined here will be appended to '/auth'
exports.routes = {

  /**
  GET requests
  **/
  get : {

    /**
    GET /auth/whoami
    **/
    '/auth/whoami' : function(req, res, next) {
      res.sendJson(req.user ? { user : req.user.toJSON() } : { error : 'Invalid token' })();
    }

  },

  /**
  POST requests
  **/
  post : {

    /**
    POST /auth/signup
    Allows anonymous access (no JWT required)
    **/
    '/auth/signup' : Security.allowAnonymousAccess(function(req, res, next) {
      var result = {};
      _.promisifyValue(User.parse(req.body))
      .then(_.rejectIfNotNull(User.validateSignup))
      .then(_.capture(User.signup, result, 'user'))
      .then(res.sendJson(result))
      .catch(res.sendError);
    }),

    /**
    POST /auth/login
    Allows anonymous access (no JWT required)
    **/
    '/auth/login' : Security.allowAnonymousAccess(function (req, res, next) {
      var result = {};
      _.promisifyValue(User.parse(req.body))
      .then(_.capture(User.login, result, 'user'))
      .then(_.capture(Security.createToken, result, 'token'))
      .then(res.sendJson(result))
      .catch(res.sendError);
    })
  }
};
