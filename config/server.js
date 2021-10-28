const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// ## funciona como midleware
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
// app.use(express.json({ type: 'application/vnd.api+json' }));


consign()
  .include('app/routes')
  .then('config/dbConnection.js')  
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;