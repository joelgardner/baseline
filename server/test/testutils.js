var _ = require('../src/services/utils')._;
var assert = require('chai').assert;

describe('util promise helpers', function () {

  describe('promisifyValue', function() {
    it('should take a value and resolve with it', function(done) {
      _.promisifyValue('world')
      .then(function(result) {
        assert.equal(result, 'world');
        done();
      })
    });
  });

  describe('capture', function() {
    it('should save the value of a promise to an obj and pass it through', function (done) {
      var cage = {};
      _.capture(_.promisifyValue('world'), cage, 'hello')
      .then(_.capture(function(world) { return _.promisifyValue('bar ' + world) }, cage, 'foo'))
      .then(function(barWorld) { return 'hello ' + barWorld; })
      .then(function(result) {
        assert.equal(cage.hello, 'world');
        assert.equal(cage.foo, 'bar world');
        assert.equal(result, 'hello bar world');
        done();
      });
    });
  });

  describe('sideEffect', function() {
    it('should ignore the eventual value of its input and pass through the output of the previous promise', function (done) {
      _.promisifyValue('world!')
      .then(_.sideEffect(function(world) {
        assert.equal(world, 'world!');
        return _.promisifyValue('ignored side-effect output!')
      }))
      .then(function(result) {
        assert.equal(result, 'world!');
        done();
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
});
