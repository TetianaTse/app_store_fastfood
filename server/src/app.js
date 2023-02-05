const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categories = require('./categories.json');
const products = require('./products.json');

const ORDERS = [];

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000;
app.get('/api/categories', function(request, res) {
  // response.send(200, categories);
  res.status(200).send(categories);
});
app.post('/api/orders', function(request, res) {
  const order = request.body;
  ORDERS.push(order);
  console.dir(ORDERS);
  res.status(200).send('Thank you for your order, order accepted!');
});

app.get('/api/products/:category', function(request, res) {
  const category = request.params.category;
  const productsByCategory = products[category] || [];
  // response.send(200, JSON.stringify(productsByCategory));
  res.status(200).send(JSON.stringify(productsByCategory));
})

app.listen(PORT);