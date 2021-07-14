import express from 'express'
import response from './data'

const app = express()
const port = 9500

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api', function (req, res) {
  res.type('application/json')
  res.send(response)
})

app.listen(port, () => console.log(`App listening on port ${port}`))