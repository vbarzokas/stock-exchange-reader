'use strict';

/**
 * The collection of error IDs supported by this API.
 *
 * @class Errors
 * @static
 * @module StockExchangeReader
 */
module.exports = {
	CACHE: {
		/**
		 * There was a connection error with the Cache module.
		 *
		 * @property {Number} CACHE.CONNECTION_ERROR
		 * @default 10001
		 * @static
		 * @final
		 */
		CONNECTION_ERROR: 10001,
		/**
		 * There was an internal error on the Cache module during an operation.
		 *
		 * @property {Number} CACHE.INTERNAL_ERROR
		 * @default 10002
		 * @static
		 * @final
		 */
		INTERNAL_ERROR: 10002
	},
	EXCHANGE: {
		/**
		 * There was an error during the fetch operation against the target exchange market website.
		 *
		 * @property {Number} CACHE.FETCH_ERROR
		 * @default 20001
		 * @static
		 * @final
		 */
		FETCH_ERROR: 20001
	}
};
