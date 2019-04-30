'use strict';

/**
 * The base class for any strategy implementation against a stock exchange market.
 * Strategies are expected to implement all the methods of this class.
 *
 * @class Exchange
 * @param {Object} market The target stock exchange market object to use.
 * @constructor
 */
function Exchange(market) {
	this._market = market;
}

/**
 * @method fetch
 * @param {String} symbol The target stock ticker symbol to fetch.
 * @returns {Promise}
 */
Exchange.prototype.fetch = function(symbol) {
	return this._market.fetch(symbol);
};

/**
 *
 * @method scrape
 * @param {String} html The HTML code to extract data from.
 * @returns {String}
 */
Exchange.prototype.scrape = function(html) {
	return this._market.scrape(html);
};

module.exports = Exchange;