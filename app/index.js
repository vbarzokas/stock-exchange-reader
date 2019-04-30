'use strict';

const config = require('./config'),
	Exchange = require('./lib/exchange'),
	Nasdaq = require('./lib/exchange/nasdaq'),
	Cache = require('./lib/cache'),
	Server = require('./lib/server'),
	nasdaq = new Nasdaq(),
	exchange = new Exchange(nasdaq),
	cache = new Cache(config.cache),
	server = new Server(config.http, exchange, cache);

cache.once('ready', () => {
	server.start();
});