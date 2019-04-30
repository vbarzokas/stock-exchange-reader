'use strict';

const assert = require('assert'),
	sinon = require('sinon'),
	Exchange = require('../../../lib/exchange');

describe('Exchange:', function() {
	describe('Constructor:', function() {
		it('Initializes the private properties:', function() {
			const fakeImplementation = {},
				exchange = new Exchange(fakeImplementation);

			assert.deepEqual(exchange._market, fakeImplementation);
		});
	});

	describe('fetch:', function() {
		it('Calls the `fetch` method of the provided strategy implementation.:', function() {
			const fakeImplementation = {
					fetch: sinon.stub().returns(true)
				},
				exchange = new Exchange(fakeImplementation),
				fakeSymbol = 'foo';

			exchange.fetch(fakeSymbol);
			assert.equal(exchange._market.fetch.called, true);
		});
	});

	describe('scrape:', function() {
		it('Calls the `scrape` method of the provided strategy implementation.:', function() {
			const fakeImplementation = {
					scrape: sinon.stub().returns(true)
				},
				exchange = new Exchange(fakeImplementation),
				fakeHtml = 'foo';

			exchange.scrape(fakeHtml);
			assert.equal(exchange._market.scrape.called, true);
		});
	});
});