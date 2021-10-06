const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
client.set('pagehits', 0);

app.get('/', (req,res) => {
  client.get('pagehits', (err, pagehits) => {
    res.send('Number of page hits: ' + pagehits);
    client.set('pagehits', parseInt(pagehits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Port 8081');
})
