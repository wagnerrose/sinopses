const {check, validationResult} = require('express-validator');

module.exports = function(application) {
  // lista um livro
  application.get('/livro/mostra', function(req,res){
    application.app.controllers.books.book(application, req, res);
  });
 
  // lista todos os livros
  application.get('/livros/lista', function(req,res){
    let validator = undefined
    application.app.controllers.books.books(validator, application, req, res);
  });

  // formulários de criação ou atualizacao Livros
  application.get('/livro', 
  (req,res) => {
    console.log(req.query)
    if (req.query.id == undefined ) {
      application.app.controllers.books.createForm(application, req, res);
    } else {
      application.app.controllers.books.updateForm(application, req, res);
    };
  });  

  // Cria novo registo de um livro
  application.post('/livro/novo',
    [check('title')
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Nome do autor deve ser preenchido com no minimo 10 carateres.'),
      check('authorid')
      .notEmpty()
      .withMessage('O autor deve ser preenchido.'),
      check('publisherid')
      .notEmpty()
      .withMessage('A editora deve ser preenchida.'),
      check('categoriesid')
      .notEmpty()
      .withMessage('A categoria deve ser preenchida.'),
      check('publisheddate')
      .notEmpty()
      .withMessage('A data de publicação deve ser preenchida.')], 
    (req,res)=> application.app.controllers.books.create(application, req, res));


  // Atualiza um livro
  application.post('/livro/:id', 
   [check('title')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('Nome do autor deve ser preenchido.'),
    check('authorid')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('O autor deve ser preenchido.'),
    check('publisherid')
    .notEmpty()
    .withMessage('A editora deve ser preenchida.'),
    check('categoriesid')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('A categoria deve ser preenchida.'),
    check('publisheddate')
    .notEmpty()
    .withMessage('A data de publicação deve ser preenchida.')], 
  (req,res)=> application.app.controllers.books.update(application, req, res));


  // Apaga um livro
  application.get('/livro/apaga', function (req, res){
    application.app.controllers.books.delete(application, req, res);
  })
};  
