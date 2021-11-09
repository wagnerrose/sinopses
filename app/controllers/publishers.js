const {check, validationResult} = require('express-validator');

module.exports.publisher = function(application, req, res) {
  var connection = application.config.dbConnection;
  var publishersModel = new application.app.models.publishersModel(connection);

  var publisher = req.query;

  publishersModel.getPublisher(publisher, function(error, result){
    res.render("publishers/publisher", {publisher: result.rows[0]});
  })
}

module.exports.publishers = function(application, req, res) {
  var connection = application.config.dbConnection;
  var publishersModel = new application.app.models.publishersModel(connection);

  publishersModel.getPublishers(function(error, result){
    // console.log(result.rows);
    res.render("publishers/publishers", {publishers: result.rows});
  })  
}

module.exports.form_add_publisher = function(application, req, res) {
  res.render('publishers/form_add_publisher', {validator: undefined, publisher : {} });
}

module.exports.publisher_save = function(application, req, res) {
  var publisher = req.body;
  // validacao
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
    res.render("publishers/form_add_publisher",{validator: validator, publisher : publisher });
  return;
  }

  var connection = application.config.dbConnection;
  var publishersModel = new application.app.models.publishersModel(connection);

  publishersModel.savePublisher(publisher, function(error, result){
    res.redirect('/editoras');
  });
}
