## Stock exchange reader
A dockerized setup of 
* a node.js REST API able to retrieve live stock ticker prices from Nasdaq exchange market.
* a [Redis Cluster environment](https://github.com/Grokzen/docker-redis-cluster), used for short-term caching and speeding up the API responses.

#### Requirements: 
* [Docker Community Edition](https://www.docker.com/community-edition)
#### Installing/Running

```
docker-compose up
```

By default the application will be started on port `8080`. This is configurable via the `config.js` file of the app.

### Example

```sh
curl  127.0.0.1:8080/live/aapl
```

#### Notes
 * For further information about running and testing the node.js application please check the README file inside the `app` folder.