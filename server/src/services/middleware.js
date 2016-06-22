var User = require("../data/models/user");

/**
Http custom middleware adds two methods to the response object that are heavily used by the routing logic:
(a) sendError is used to send validation errors or exceptions
(b) sendJson is used to send API responses
**/
exports.http = function(req, res, next) {

  res.sendError = function _sendError (error) {
    // /**
    // the error "framework" adds a length property to indicate the number of errors,
    // at this point we can delete it, since we know we have an error
    // **/
    // delete error.length;
    // delete error.hasErrors;

    // send back a 400 with a JSON object of error descriptions
    res.status(400).json({ error: error });
  };

  res.sendJson = function _sendJson(payload) {
    return function(/* ignored output from promise chain */) {
      res.json(payload);
    };
  };

  next();
};


/**
Takes an Express app and an authentication handler (which for now is PassportJWT).
**/
exports.routes = function(app, authMethod) {
  var auth = require('../routes/auth');
  [
    /**
    Add route modules here
    **/
    auth.routes
  ].forEach(function(routeModule) {
    ['get', 'post', 'put', 'delete', 'patch'].forEach(function(httpMethod) {
      if (!routeModule[httpMethod]) return;
      Object.keys(routeModule[httpMethod]).forEach(function(route) {
        routeModule[httpMethod][route].allowAnonymous
          ? app[httpMethod](route, routeModule[httpMethod][route])
          : app[httpMethod](route, authMethod, routeModule[httpMethod][route]);
      });
    });
  });
}


/**
Used by Passport to verify the user's credentials.
**/
exports.jwt = function() {

  var PassportJwt = require('passport-jwt'),
      config = require("config"),
      JwtStrategy = PassportJwt.Strategy,
      ExtractJwt = PassportJwt.ExtractJwt;

  return new JwtStrategy({
      jwtFromRequest : ExtractJwt.fromAuthHeader(),
      secretOrKey : config.token.secret
    }, function(jwt_payload, done) {
      // search for user encoded by JWT payload
      User.Model.forge({ id: jwt_payload.id })
        .fetch()
        .then(function(user) {
          return user ? done(null, user) : done(null, false, 'Invalid login credentials');
        })
        .catch(function(e) {
          console.log("auth.local exception: " + e);
          done(e, null);
        });
    });
};
