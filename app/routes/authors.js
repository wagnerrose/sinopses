module.exports = function(application) {

  application.get('/autor', function(req,res){
    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel(connection);

    authorsModel.getAuthor(function(error, result){
      res.render("authors/author", {author: result.rows[0]});
    })
  });

  application.get('/autores', function(req,res){
    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel(connection);

    authorsModel.getAuthors(function(error, result){
      res.render("authors/authors", {authors: result.rows});
    })
  });
};  