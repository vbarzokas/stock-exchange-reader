'use strict';

const restify = require('restify'),
	bunyan = require('bunyan'),
	routes = require('./routes');

/**
 * Creates the HTTP server abstraction for communicating with the REST API.
 *
 * @class Server
 * @param {Object} config Configuration object with structure:
 *
 *  {
 *		port: <Number> The target HTTP port to use.
 *	}
 *
 * @param {Object} exchange An instance of the target exchange market module.
 * @param {Object} cache An instance of the internal cache module.
 * @constructor
 */
function Server(config, exchange, cache) {
	this._config = config;
	this._exchange = exchange;
	this._cache = cache;

	this._instance = restify.createServer();

	this._instance.on('after', restify.plugins.auditLogger({
		log: bunyan.createLogger({
			name: 'audit',
			stream: process.stdout
		}),
		event: 'after',
		printLog: true
	}));
}

/**
 * Starts the HTTP server and listens for incoming requests.
 *
 * @method start
 * @returns {Promise}
 */
Server.prototype.start = function() {
	return new Promise((resolve) => {
		this._instance.listen(this._config.port, () => {
			routes(this);

			resolve();
		});
	});
};

module.exports = Server;

