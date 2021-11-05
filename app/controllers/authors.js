const {check, validationResult} = require('express-validator');

module.exports.authors = function(application, req, res){
    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel(connection);

    authorsModel.getAuthors(function(error, result){
      res.render("authors/authors", {authors: result.rows});
    })
}

module.exports.author = function(application, req, res){
  var connection = application.config.dbConnection;
  var authorsModel = new application.app.models.authorsModel(connection);

  authorsModel.getAuthor(function(error, result){
    res.render("authors/author", {author: result.rows[0]});
  })
}


module.exports.form_add_author = function(application, req, res){
  res.render('authors/form_add_author', {validator : undefined, author : {} });
}

module.exports.author_save = function(application,req, res){
    var author = req.body;
  
    const validator = validationResult(req);
    if(!validator.isEmpty()) {
        res.render("authors/form_add_author",{validator: validator, author: author});
      return;
    };

    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel(connection);

    authorsModel.saveAuthor(author, function(error, result){
      res.redirect("/autores");
    });
}