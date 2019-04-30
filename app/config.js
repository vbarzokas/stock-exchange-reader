'use strict';

module.exports = {
	http: {
		port: 8080
	},
	cache: {
		expiration: 60000,
		nodes: [
			{
				host: '127.0.0.1',
				port: 7000
			},
			{
				host: '127.0.0.1',
				port: 7001
			},
			{
				host: '127.0.0.1',
				port: 7002
			}
		]
	}
};
