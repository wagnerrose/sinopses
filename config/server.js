let path = require('path');
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();
// const {check, validationResult} = require('express-validator');
// let dir = path.join(__dirname, 'public');



app.set('view engine', 'ejs');
app.set('views', './app/views');

// ## funciona como midleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"../app/public")));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')  
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;