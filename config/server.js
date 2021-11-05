const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();
// const {check, validationResult} = require('express-validator');

app.set('view engine', 'ejs');
app.set('views', './app/views');

// ## funciona como midleware
app.use(bodyParser.urlencoded({extended: true}));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')  
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;