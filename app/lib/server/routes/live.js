'use strict';

const restify = require('restify');

/**
 * Fetches the stock ticker price for target symbol. The value of the fetched price is cached for 60 seconds.
 *
 * @method GET /2/live/:symbol
 * @return {Object} Either:
 *  * 500 status code if an internal server error occured.
 *  * 200 status code otherwise, with a JSON object similar to this example:
 *  ```json
 * {
 *     "value": "$200.45"
 * }
 * ```
 */
function getSymbol(server, req, res, next) {
	const symbol = req.params.symbol;

	server._cache
		.get(symbol)
		.then((cachedValue) => {
			if (cachedValue != null) {
				res.json({price: cachedValue});

				next();
			}
			else {
				server._exchange
					.fetch(symbol)
					.then(function(html) {
						const value = server._exchange.scrape(html);

						server._cache
							.set(symbol, value)
							.then(() => {
								res.json({price: value});

								next();
							})
							.catch((error) => {
								req.log.error(JSON.stringify({error: error}));

								next(error);
							});
					})
					.catch((error) => {
						req.log.error(JSON.stringify({error: error}));

						next(error);
					});
			}
		})
		.catch((error) => {
			req.log.error(JSON.stringify({error: error}));

			next(error);
		});
}

module.exports = function(server) {
	server._instance.get('/live/:symbol', restify.plugins.conditionalHandler([
		{
			version: '1.0.0',
			handler: getSymbol.bind(null, server)
		}
	]));
};