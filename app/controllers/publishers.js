const {check, validationResult} = require('express-validator');
// list one publisher
module.exports.publisher = function(application, req, res) {
  let connection = application.config.dbConnection;
  let publishersModel = new application.app.models.publishersModel(connection);

  let publisher = req.query;

  publishersModel.getPublisher(publisher, function(error, result){
    res.render("publishers/publisher", {publisher: result.rows[0]});
  })
}
// list all publishers
module.exports.publishers = function(application, req, res) {
  let connection = application.config.dbConnection;
  let publishersModel = new application.app.models.publishersModel(connection);

  publishersModel.getPublishers(function(error, result){
    // console.log(result.rows);
    res.render("publishers/publishers", {publishers: result.rows});
  })  
}
// Create Form
module.exports.createForm = function(application, req, res){
  res.render('publishers/createPublisher', {validator : undefined, publisher : {}});
};

// Update Form
module.exports.updateForm = function(application, req, res){
var connection = application.config.dbConnection;
var publishersModel = new application.app.models.publishersModel(connection);
// obtem indice
var publisher = req.query;
// encontra registro e chama form update
publishersModel.getPublisher(publisher,function(error, result){
  res.render("publishers/updatePublisher", {validator : undefined, publisher: result.rows[0]});
})
};

// Create
module.exports.create = function(application, req, res){
  let publisher = req.body;
  console.log('criação==>>', publisher);
  // validacao de dados
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
    res.render("publishers/createPublisher",{validator : validator, publisher : publisher});
  };

  // Instancia o modelo
  let connection = application.config.dbConnection;
  let publishersModel = new application.app.models.publishersModel(connection);

  // cria novo registro
  publishersModel.create(publisher, function(error, result){
    res.redirect("/editoras/lista");
  });
}

// update
module.exports.update = function(application, req, res){
  let publisher = {} 
  publisher.name = req.body.name;
  publisher.id = req.params.id;


  // valida dados e retorna em caso de erro com mensagem
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
      res.render("publishers/updatePublisher",{validator : validator, publisher : publisher});
  };
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let publishersModel = new application.app.models.publishersModel(connection);

  // atualiza registro
  publishersModel.update(publisher, function(error, result){
    res.redirect("/editoras/lista");
  });
}

// Delete
module.exports.delete = function(application, req, res){
  let connection = application.config.dbConnection;
  let publishersModel = new application.app.models.publishersModel(connection);

  let publisher = req.query;

  publishersModel.delete(publisher, function(error, result){ 
    res.redirect("/editoras/lista");
  });
}