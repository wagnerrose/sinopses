const {check, validationResult} = require('express-validator');

// Lista um autor
module.exports.author = function(application, req, res){
  var connection = application.config.dbConnection;
  var authorsModel = new application.app.models.authorsModel(connection);

  var author = req.query;

  authorsModel.getAuthor(author, function(error, result){
    res.render("authors/author", {author: result.rows[0]});
  })
}

// Lista todos autores
module.exports.authors = function(application, req, res){
  var connection = application.config.dbConnection;
  var authorsModel = new application.app.models.authorsModel(connection);

  authorsModel.getAuthors(function(error, result){
    res.render("authors/authors", {validator : undefined, authors: result.rows});
  })
}

// Create Form
module.exports.createForm = function(application, req, res){
  res.render('authors/createAuthor', {validator : undefined, author : {}});
};

// Update Form
module.exports.updateForm = function(application, req, res){
var connection = application.config.dbConnection;
var authorsModel = new application.app.models.authorsModel(connection);
// obtem indice
var author = req.query;
// encontra registro e chama form update
authorsModel.getAuthor(author,function(error, result){
  res.render("authors/updateAuthor", {validator : undefined, author: result.rows[0]});
})
};

// Create
module.exports.create = function(application, req, res){
  let author = req.body;
  // validacao de dados
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
    res.render("authors/createAuthor",{validator : validator, author : author});
  };

  // Instancia o modelo
  let connection = application.config.dbConnection;
  let authorsModel = new application.app.models.authorsModel(connection);

  // cria novo registro
  authorsModel.create(author, function(error, result){
    res.redirect("/autores/lista");
  });
}

// update
module.exports.update = function(application, req, res){
let author = {} 
author.author= req.body.author;
author.id = req.params.id;

// valida dados e retorna em caso de erro com mensagem
const validator = validationResult(req);
if(!validator.isEmpty()) {
    res.render("author/updateAuthor",{validator : validator, author : author});
};
// Instancia o modelo
let connection = application.config.dbConnection;
let authorModel = new application.app.models.authorsModel(connection);

// atualiza registro
authorModel.update(author, function(error, result){
  res.redirect("/autores/lista");
});
}

// Delete
module.exports.delete = async function(application, req, res){
  let connection = application.config.dbConnection;
  let authorsModel = new application.app.models.authorsModel(connection);
  let author = req.query;

  authorsModel.findBooks(author, function(error, result){
    // if exists books can't delete it
    console.log('achei livros como o autor: ',result.rowCount);
    if (result.rowCount > 0) {
      let validator = 'Existem livros contendo o Autor';
      console.log(validator);
    } else {
      authorsModel.delete(author, function( error, result){
        if(error) {
          console.log(error.stack)
        };
      });
    }
    authorsModel.getAuthors(function(error, result){
      // res.render("authors/authors", {validator : validator, authors: result.rows});
      res.redirect("/autores/lista");
    });
  });
}
