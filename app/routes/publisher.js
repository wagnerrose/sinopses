const {check, validationResult} = require('express-validator');

module.exports = function(application) {

  // Read one Publisher
  application.get('/editora', function(req,res){
    application.app.controllers.publishers.publisher(application, req, res);
  });
  // Read all Publishers
  application.get('/editoras', function(req,res){
    application.app.controllers.publishers.publishers(application, req, res);
  });
  // Create
  application.get('/form_add_publisher', function(req,res){
    application.app.controllers.publishers.form_add_publisher(application, req, res);
  });
  // Save
  application.post('/publishers/save',[
    check('name')
    .notEmpty()
    .withMessage('Nome da editora deve ser preenchido.')],
    function(req,res){
     application.app.controllers.publishers.publisher_save(application, req, res);
  });
  // Delete
  application.get('/editora/apagar', function(req, res) {
    application.app.controllers.publishers.delete(application, req, res);
  });
};  