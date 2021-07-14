import express from 'express'
import controller from './controller'

const app = express()
const port = 9000

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/ride-price', controller)

app.listen(port, () => console.log(`App listening on port ${port}`))