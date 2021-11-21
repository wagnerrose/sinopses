const {check, validationResult} = require('express-validator');

module.exports = function(application) {

  // lista um autor
  application.get('/autor/mostra', function(req,res){
    application.app.controllers.authors.author(application, req, res);
  });

  // Lista todos autores
  application.get('/autores/lista', function(req,res){
    let validator = undefined
    application.app.controllers.authors.authors(validator, application, req, res);
  });

  // formulários de criação ou atualizacao autor
  application.get('/autor', 
  (req,res) => {
    if (req.query.id == undefined ) {
      application.app.controllers.authors.createForm(application, req, res);
    } else {
      application.app.controllers.authors.updateForm(application, req, res);
    };
  });                   

  // Cria registro autor 
  application.post('/autor/novo', 
    [check('name')
    .notEmpty()
    .withMessage('Nome do autor deve ser preenchido.'),
    check('birthdate')
      .notEmpty()
      .withMessage('A data deve ser preenchida.')],    
    (req,res)=> application.app.controllers.authors.create(application, req, res));

  // Atualiza registro autor
  application.post('/autor/:id', 
  [check('name')
  .notEmpty()
  .withMessage('Nome do autor deve ser preenchido.'),
  check('birthdate')
  .notEmpty()
  .withMessage('A data deve ser preenchida.')],
  (req,res)=> application.app.controllers.authors.update(application, req, res));


  // Apaga um autor
  application.get('/autor/apaga', function (req, res){
    application.app.controllers.authors.delete(application, req, res);
  })

};  
