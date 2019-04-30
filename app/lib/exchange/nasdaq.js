'use strict';

const axios = require('axios'),
	cheerio = require('cheerio'),
	ERRORS = require('../constants/errors');

/**
 * The Nasdaq strategy for the Exchange module.
 *
 * @class Nasdaq
 * @constructor
 */
function Nasdaq() {
	this._url = 'https://www.nasdaq.com/symbol/{symbol}/real-time';
	this._tickerPriceSelector = '#qwidget_lastsale';
}

/**
 * Fetches the target stock ticker price from the Nasdaq stock exchange official website.
 *
 * @param {String} symbol
 * @returns {Promise}
 */
Nasdaq.prototype.fetch = function(symbol) {
	const target = this._url.replace('{symbol}', symbol);

	return new Promise((resolve, reject) => {
		axios.get(target)
			.then((response) => {
				resolve(response.data);
			})
			.catch(() => {
				reject(ERRORS.EXCHANGE.FETCH_ERROR);
			});
	});
};

/**
 * Extracts the stock ticker price from the HTML code of the Nasdaq stock exchange official website.
 *
 * @param {String} html
 * @returns {String}
 */
Nasdaq.prototype.scrape = function(html) {
	const $ = cheerio.load(html);

	return $(this._tickerPriceSelector).text().trim();
};

module.exports = Nasdaq;