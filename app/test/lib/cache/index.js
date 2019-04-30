'use strict';

const assert = require('assert'),
	sinon = require('sinon'),
	config = require('../../../config'),
	Cache = require('../../../lib/cache'),
	ERRORS = require('../../../lib/constants/errors');

describe('Cache:', function() {
	describe('Constructor:', function() {
		describe('Failures:', function() {
			it('emits the event `error` and the error `CACHE.CONNECTION_ERROR` ' +
				'when the connection cannot be established.', function(done) {
				const cache = new Cache({nodes: [{port: 999999}]});

				assert.notEqual(cache._instance, null);
				assert.equal(cache._expiration, null);

				cache.once('error', function(error) {
					assert.equal(error, ERRORS.CACHE.CONNECTION_ERROR);

					cache._instance.disconnect();

					done();
				});
			});
		});

		describe('Success:', function() {
			it('emits the event `ready` when the connection has been established.', function(done) {
				const cache = new Cache(config.cache);

				assert.notEqual(cache._instance, null);
				assert.equal(cache._expiration, config.cache.expiration);

				cache.once('ready', done);
			});
		});
	});

	describe('Public methods:', function() {
		let cache;

		beforeEach(function(done) {
			cache = new Cache(config.cache);

			cache.once('ready', done);
		});

		afterEach(function() {
			cache._instance.disconnect();
		});

		describe('set:', function() {
			const validKey = 'foo',
				validValue = 'bar',
				validExpiration = 1000;

			describe('Failures:', function() {
				it('Rejects the Promise with `CACHE.INTERNAL_ERROR` if ' +
					'it fails to store the target value to cache.', function(done) {
					sinon.stub(cache._instance, 'set').returns(Promise.reject('rejected'));

					cache.set(validKey, validValue, validExpiration)
						.catch((error) => {
							assert.equal(error, ERRORS.CACHE.INTERNAL_ERROR);

							cache._instance.set.restore();

							done();
						});
				});
			});

			describe('Success:', function() {
				it('Resolves the Promise if it succeeds to store the value to cache.', function(done) {
					sinon.stub(cache._instance, 'set').returns(Promise.resolve());

					cache.set(validKey, validValue, validExpiration)
						.catch(() => {
							throw new Error('It should not be here');
						})
						.then((result) => {
							assert.equal(result, null);

							cache._instance.set.restore();

							done();
						});
				});
			});
		});

		describe('get:', function() {
			const validKey = 'foo';

			describe('Failures:', function() {
				it('Rejects the Promise with `CACHE.INTERNAL_ERROR` if it fails to store the target value to cache.',
					function(done) {
						sinon.stub(cache._instance, 'get').returns(Promise.reject('rejected'));

						cache.get(validKey)
							.catch((error) => {
								assert.equal(error, ERRORS.CACHE.INTERNAL_ERROR);

								cache._instance.get.restore();

								done();
							});
					});
			});

			describe('Success:', function() {
				it('Resolves the Promise if it succeeds to store the value to cache.', function(done) {
					sinon.stub(cache._instance, 'get').returns(Promise.resolve());

					cache.get(validKey)
						.catch(() => {
							throw new Error('It should not be here');
						})
						.then((result) => {
							assert.equal(result, null);

							cache._instance.get.restore();

							done();
						});
				});
			});
		});
	});
});