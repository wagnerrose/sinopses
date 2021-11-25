const {check, validationResult} = require('express-validator');

// Lista um autor
module.exports.author = function(application, req, res){
  var connection = application.config.dbConnection;
  var authorsModel = new application.app.models.authorsModel(connection);

  var author = req.query;

  authorsModel.getAuthor(author, async function(error, result){
    res.render("authors/author", {author: result.rows[0]});
    await authorsModel.end();
  })
}

// Lista todos autores
module.exports.authors = function(validator,application, req, res){
  var connection = application.config.dbConnection;
  var authorsModel = new application.app.models.authorsModel(connection);

  authorsModel.getAuthors(function(error, result){
    res.render("authors/authors", {validator : validator, authors: result.rows});
    authorsModel.end();
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
    authorsModel.end();// encerra conexão
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
    authorsModel.end();
  });
}

// update
module.exports.update = async function(application, req, res){
  let author = {} 
  author.name = req.body.name;
  author.birthdate = req.body.birthdate;
  author.id = req.params.id;
  console.log(req.body)

  // valida dados e retorna em caso de erro com mensagem
  let validator = validationResult(req);
  if(!validator.isEmpty()) {
      res.render("author/updateAuthor",{validator : validator, author : author});
  };
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let authorsModel = new application.app.models.authorsModel(connection);

  // atualiza registro
  console.log('controller author', author)
  result = await authorsModel.update(author);
  result ? validator = "Autor atualizado": validator = "Ocorreu um erro ao atualizar o autor."
  application.app.controllers.authors.authors(validator, application, req, res);
    // res.redirect("/autores/lista");
  await authorsModel.end();
}

// Delete
module.exports.delete = async function(application, req, res){
  let connection = application.config.dbConnection;
  let authorsModel = new application.app.models.authorsModel(connection);
  let author = req.query;
  let validator
  let nlivros = await authorsModel.findBooks(author);
  if (nlivros > 0) {
    validator = `Atenção, existe ${nlivros} livro(s) deste autor. Apague os livros antes de apagar o autor.`;
  } else {
    console.log('entrei no delete')
    let result = await authorsModel.delete(author);
    result ? validator = "Autor apagado": validator = "Ocorreu um erro ao apagar o autor."
  };
  console.log('apagado validator',validator)
  application.app.controllers.authors.authors(validator, application, req, res);
  // res.redirect("/autores/lista");
}
