'use strict';

const assert = require('assert'),
	axios = require('axios'),
	Exchange = require('../../../../lib/exchange'),
	Nasdaq = require('../../../../lib/exchange/nasdaq'),
	Cache = require('../../../../lib/cache'),
	Server = require('../../../../lib/server'),
	config = require('../../../../config');

describe('GET /live/:symbol', function() {
	const targetURL = 'http://127.0.0.1:8080/live/aapl';
	let cache,
		exchange,
		nasdaq,
		server;

	before(function(done) {
		nasdaq = new Nasdaq();
		exchange = new Exchange(nasdaq);
		cache = new Cache(config.cache);

		server = new Server(config.http, exchange, cache);

		cache.once('ready', () => {
			server.start().then(done);
		});
	});

	after(function(done) {
		server._instance.close(done);
	});

	it('Retrieves the target stock ticker value.', function(done) {
		axios.get(targetURL)
			.then((response) => {
				assert.equal(typeof response.data, 'object');
				assert.equal(typeof response.data.price, 'string');

				done();
			})
			.catch(() => {
				throw new Error('It should not be here');
			});
	});
});