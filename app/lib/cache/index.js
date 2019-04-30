'use strict';

const EventEmitter = require('events').EventEmitter,
	IORedis = require('ioredis'),
	util = require('util'),
	ERRORS = require('../constants/errors');

/**
 * @class Cache
 * @param {Object} config The configuration parameters for the cache module, with structure:
 *
 * 	{
 *     	nodes: {Array} Where each entry is an object of `{host: <string>, port: <number>}`,
 *     	expiration: {Number} The time (in ms) after which the cache value is automatically deleted.
 * 	}
 *
 * @constructor
 */
function Cache(config) {
	this._instance = new IORedis.Cluster(config.nodes);
	this._expiration = config.expiration;

	this._instance
		.once('error', connectError.bind(null, this))
		.once('connect', () => {
			//remove the listener if the connection is successful to avoid calling the `connectError` function in case the
			//connection fails at a later stage.
			this._instance.removeListener('error', connectError);

			this.emit('ready');
		});
}

util.inherits(Cache, EventEmitter);

/**
 * Stores a value in the internal cache.
 *
 * @method set
 * @param {String} key The key to set in the internal cache storage.
 * @param {String|Number} value The value to set in the internal cache storage.
 * @param {Number} [expiration] The time (in ms) after which the cache value is automatically deleted. If not provided the default
 *  value will be used.
 * @returns {Promise}
 */
Cache.prototype.set = function(key, value, expiration) {
	return new Promise((resolve, reject) => {
		this._instance.set(key, value, 'PX', expiration || this._expiration)
			.then(resolve)
			.catch(() => {
				reject(ERRORS.CACHE.INTERNAL_ERROR);
			});
	});
};

/**
 * Retrieves a value from the internal cache.
 *
 * @method get
 * @param {String} key The key to retrieve from the internal cache storage.
 * @returns {Promise}
 */
Cache.prototype.get = function(key) {
	return new Promise((resolve, reject) => {
		this._instance.get(key)
			.then(resolve)
			.catch(() => {
				reject(ERRORS.CACHE.INTERNAL_ERROR);
			});
	});
};

function connectError(cache) {
	cache.emit('error', ERRORS.CACHE.CONNECTION_ERROR);

	cache._instance.disconnect();
}

module.exports = Cache;