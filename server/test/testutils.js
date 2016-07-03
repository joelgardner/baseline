var _ = require('../src/services/utils')._;
var assert = require('chai').assert;

describe('util promise helpers', function () {

  describe('promisifyValue', function() {
    it('should take a value and resolve with it', function() {
      _.promisifyValue('world')
      .then(function(result) {
        assert.equal(result, 'world');
      })
    });
  });

  describe('capture', function() {
    it('should save the value of a promise to an obj and pass it through', function () {
      var cage = {};
      _.capture(_.promisifyValue('world'), cage, 'hello')
      .then(_.capture(_.promisifyValue('bar')), cage, 'foo')
      .then(function(result) {
        assert.equal(cage.hello, 'world');
        assert.equal(cage.foo, 'bar');
      });
    });
  });

  describe('passThrough', function() {
    it('should ignore the eventual value of its input and pass through the output of the previous promise', function () {
      _.promisifyValue('world!')
      .then(_.passThrough(function(world) {
        assert.equal(result, 'world!');
        return _.promisifyValue('ignored output!')
      }))
      .then(function(result) {
        assert.equal(result, 'world!');
      });
    });
  });

  describe('rejectIfNotNull', function() {
    it('should reject if its input resolves to anything but null', function(done) {
      var rejected = 'i am not null, so reject me :(';
      _.promisifyValue(rejected)
      .then(_.rejectIfNotNull(_.promisifyValue))
      .then(undefined, function(result) {
        assert.equal(result, rejected);
        done();
      });
    });

    it('should resolve if its input resolves to null', function(done) {
      _.promisifyValue(null)
      .then(_.rejectIfNotNull(_.promisifyValue))
      .then(done);
    });
  });

  describe('unwrap', function() {

    it('should resolve if its input resolves to null', function(done) {
      _.promisifyValue(null)
      .then(_.rejectIfNotNull(_.promisifyValue))
      .then(done);
    });
  });
});
