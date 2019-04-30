'use strict';

const assert = require('assert'),
	sinon = require('sinon'),
	rewire = require('rewire'),
	Nasdaq = rewire('../../../lib/exchange/nasdaq'),
	ERRORS = require('../../../lib/constants/errors');

describe('Exchange:', function() {
	describe('Constructor:', function() {
		it('Initializes the private properties:', function() {
			const nasdaq = new Nasdaq();

			assert.deepEqual(nasdaq._url, 'https://www.nasdaq.com/symbol/{symbol}/real-time');
			assert.deepEqual(nasdaq._tickerPriceSelector, '#qwidget_lastsale');
		});
	});

	describe('fetch:', function() {
		describe('Error:', function() {
			it('Calls `axios.get` against the correct URL and passes back the result if it succeeds:', function(done) {
				const nasdaq = new Nasdaq(),
					fakeResult = 'foo',
					stub = sinon.stub().returns(Promise.resolve({data: fakeResult})),
					restore = Nasdaq.__set__('axios', {
						get: stub
					});

				nasdaq.fetch('fakeURL')
					.catch(() => {
						throw new Error('It should not be here.');
					})
					.then((result) => {
						assert.deepEqual(result, fakeResult);
						assert.deepEqual(stub.getCall(0).args[0], 'https://www.nasdaq.com/symbol/fakeURL/real-time');

						restore();

						done();
					});
			});
		});

		describe('Success:', function() {
			it('Calls `axios.get` against the correct URL and passes back the error `EXCHANGE.FETCH_ERROR` if it fails:',
				function(done) {
					const nasdaq = new Nasdaq(),
						stub = sinon.stub().returns(Promise.reject('rejected')),
						restore = Nasdaq.__set__('axios', {
							get: stub
						});

					nasdaq.fetch('fakeURL')
						.catch((error) => {
							assert.equal(error, ERRORS.EXCHANGE.FETCH_ERROR);
							assert.deepEqual(stub.getCall(0).args[0], 'https://www.nasdaq.com/symbol/fakeURL/real-time');

							restore();

							done();
						});
				});
		});
	});

	describe('scrape:', function() {
		it('Uses `cheerio` and returns the result if it succeeds:', function() {
			const nasdaq = new Nasdaq(),
				fakeCheerio = {
					load: sinon.stub().returns(sinon.stub().returns({
						text: sinon.stub().returns('fake text with trailing whitespaces           ')
					}))
				},
				restore = Nasdaq.__set__('cheerio', fakeCheerio),
				result = nasdaq.scrape('fakeHTML');

			assert.equal(result, 'fake text with trailing whitespaces');
			assert.equal(fakeCheerio.load.calledWith('fakeHTML'), true);

			restore();
		});
	});
});