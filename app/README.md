# Stock exchange reader

A simple node.js server script able to fetch, scrap and serve via a REST API the live stock ticker prices from Nasdaq stock market.

## Prerequisites
#### Running:
* node.js >= 8.11.4
* npm >= 5.6.0
* Redis cluster

#### Unit testing:
* mocha 
    ```
    npm i -g mocha
    ```

## Installation

```
npm install
```


## Usage

```
npm run start
```

#### Routes
Currently these routes are supported:

* `GET /live/:symbol` - Fetches the stock ticker price for target symbol. The value for each price is cached for 60 seconds.

For further information about each individual route please refer to its documentation.

## Unit Testing

```
npm run test
```