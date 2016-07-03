
/**
Dates module to standardize working with date strings, etc.
**/
exports.Dates = {

  /**
  now returns string of the current date in a format appropriate for the db
  TODO: make it better. maybe use moment.js?
  **/
  now: function() {
    return (new Date()).toString().substring(0, 24);
  }
};

/**
SECURITY
**/
exports.Security = {

  /**
  `String -> Promise<String>`
  Returns a `Promise` containing a salted hash of `password`
  **/
  hashPassword: password => {
    return new Promise(function(resolve, reject) {
      // use bcrypt to generate a salt
      var bcrypt = require('bcrypt');
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return reject(err);

        // use the salt to generate a hash of the password
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  },

  /**
  `String -> String -> Promise<Boolean>`
  Returns a `Promise` containing `true` if `hashedPassword` matches `password` according to bcrypt's `compare` method; otherwise `false`
  **/
  comparePassword: function (password, hashedPassword) {
    return new Promise(function(resolve, reject) {
      var bcrypt = require('bcrypt');
      bcrypt.compare(password, hashedPassword, function(err, is_match) {
        if (err) return reject(err);
        return resolve(is_match);
      });
    });
  },

  /**
  `Object -> Promise<String>`
  Returns a `Promise` containing a JSON web-token encoded with `payload`
  **/
  createToken: function(payload) {
    return new Promise(function(resolve, reject) {
      var jwt = require('jsonwebtoken');
      var config = require("config");
      jwt.sign(payload, config.token.secret, {}, function(err, token) {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  /**
  Sets a magical property on the handler to let the route register'er know to allow anonymous access
  **/
  allowAnonymousAccess: function(route) {
    route.allowAnonymous = true;
    return route;
  }
};

/**
VALIDATION
Contains various helper validation regex's, etc.
**/
exports.Validation = {
  isNonempty: function(value) {
    return value !== null && value !== undefined && value !== '';
  },
  emailIsValid: function(email) {
    return /[A-Za-z0-9_+]+@[A-Za-z0-9-]+\.[A-Za-z]+/.test(email);
  },
  v: function(key, isValid, validationText) {
    return {
      key: key,
      isValid: isValid,
      validationText: validationText
    };
  },
  validate: function(vs) {
    return vs.reduce(function(result, v) {
      if (v.isValid) return result;
      if (!result) result = {};
      if (!result[v.key]) result[v.key] = v.validationText;
      return result;
    }, null);
  }
};

/**
HTTP
Helper methods around errors, etc.
**/
exports.Http = {
  handleException: function (res) {
    return function(ex) {
      // called when a programming exception occurs.
      // do not send these exceptions to the client
      console.log("EXCEPTION: \n" + ex + "\n" + JSON.stringify(ex));
      res.status(503).end("Something bad happened.");
    };
  }
};

/**
MISC UTILITIES
Promise helper methods, etc.
**/
exports._ = {

  /**
  `srcObj` is the source object to parse properties from
  `keys` is an array of strings
  A new object is return whose keys map to the values on src
  **/
  parse: function(srcObj, keys) {
    return keys.reduce(function(result, propName) {
      result[propName] = srcObj[propName];
      return result;
    }, {});
  },

  // memoize: function(func, inputs/*...*/) {

  // },

  /**
  `value` is passed to Promise.resolve.
  **/
  promisifyValue: function(value) {
    return new Promise(function(resolve) {
      resolve(value);
    });
  },


  /**
  `promise_ish`: reference to a function that returns a promise
  `objRef`: a reference to an object
  `key`: the key on which to set the value on `objRef`

  It provides a convenient way to assign a promise's result to an API output,
  allowing for a more functional style for routing logic.
  **/
  capture: function (promise_ish, objRef, key) {

    function _capture(promise_ish, objRef, key, input) {
      return new Promise(function(resolve, reject) {
        return unwrap(promise_ish)(input).then(function(result) {
          objRef[key] = result;
          resolve(result);
        }, reject);
      });
    }

    var ref = _capture.bind(undefined, promise_ish, objRef, key);
    if (promise_ish && promise_ish.then) {
      return ref();
    }
    return ref;
  },

  /**
  `promiseCreator` is a function that returns a promise when invoked.
  We invoke the promise, wrapping it in another promise.
  If the result is not null, the (outer) promise is rejected with the result.
  Otherwise, the promise resolves with the input of the function.
  **/
  rejectIfNotNull: function(promise_ish) {

    // helper function to allow receiving of previous promise's result
    return function _rejectIfNotNull (input) {
      return new Promise(function(resolve, reject) {
        return unwrap(promise_ish)(input).then(function(result) {
          // reject if not null
          if (result !== null) return reject(result);

          // we resolve with the INPUT and not the result (which is null)
          // this is handy for performing validation and other ad-hoc operations in routes
          resolve(input);
        }, reject);
      });
    }
  },

  /**
  `Promise` -> (`{}` -> `Promise`)
  `promise` is a promise object that will be unwrapped, and its output discarded.
  This allows for performing side-effects that depend on the output of an intermediate promise operation.
  **/
  sideEffect: promise => {
    return input => {
      return new Promise(function(resolve, reject) {
        return unwrap(promise)(input).then(function(ignored) {
          resolve(input);
        }, reject);
      });
    }
  }
};

function unwrap (wrapped) {
  return function (input) {
    return new Promise(function(resolve, reject) {
      switch (typeof(wrapped)) {

        // if `wrapped` is just a plain object (and NOT a Promise), resolve with it.
        // if it's a Promise, collapse it and return the target value.
        case 'object':
          wrapped instanceof Promise
            ? collapse(wrapped).then(resolve)
            : resolve(wrapped);
          break;

        // if `wrapped` is a function, call it with our input and return the result
        case 'function':
          collapse(wrapped(input)).then(resolve);
          break;

        // if `wrapped` is a string|number|boolean|null, resolve with it
        default:
          resolve(wrapped);
      }
    });
  }
}

/**
Collapse is like flatMap.  TODO: rename it to flatMap?
input: `value_ish` which can be any type
output: a `Promise` that resolves with `value_ish`'s target value.
If `value_ish` is a Promise, it will be `.then`'ed until we decend to the target type (value)
**/
function collapse(value_ish) {

  /**
  If `value_ish` is a Promise, recursively flatten the Promise(s) down to -- and then resolve with -- the target value.
  Otherwise, simply resolve with `value_ish`
  **/
  if ((value_ish instanceof Promise) === false)
    return exports._.promisifyValue(value_ish);

  /**
  the result is a final promise which resolves with the target/leaf value of `value_ish`
  **/
  return new Promise((resolve, reject) => {

    function _collapse(result) {
      result instanceof Promise
        ? result.then(_collapse)
        : resolve(result);
    }

    value_ish.then(_collapse);
  });

}


