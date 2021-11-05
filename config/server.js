var path = require('path');
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();
// const {check, validationResult} = require('express-validator');
var dir = path.join(__dirname, '../app/public/');

app.set('view engine', 'ejs');
app.set('views', './app/views');

// ## funciona como midleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(dir));
console.log(dir);
consign()
  .include('app/routes')
  .then('config/dbConnection.js')  
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;