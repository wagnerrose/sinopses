const express = require('express');
const consign = require('consign');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

consign()
  .include('app/routes')
  .then('config/dbConnection.js')  
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;