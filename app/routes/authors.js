const {check, validationResult} = require('express-validator');

module.exports = function(application) {

  application.get('/autor', function(req,res){
    application.app.controllers.authors.author(application, req, res);
  });

  application.get('/autores', function(req,res){
    application.app.controllers.authors.authors(application, req, res);
  });

  application.get('/form_add_author', function(req,res){
    application.app.controllers.authors.form_add_author(application, req, res);
  });

  application.post('/authors/save',[
    check('name')
      .notEmpty()
      .withMessage('Nome deve ser preenchido.'),
    check('birthdate')
      .notEmpty()
      .withMessage('A data deve ser preenchida.')],
    function(req, res) {
    application.app.controllers.authors.author_save(application, req, res);
  });

};  