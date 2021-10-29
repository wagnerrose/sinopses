module.exports = function(application) {

  application.get('/autor', function(req,res){
    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel;

    authorsModel.getAuthor(connection, function(error, result){
      res.render("authors/author", {author: result.rows[0]});
    })
  });

  application.get('/autores', function(req,res){
    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel;

    authorsModel.getAuthors(connection, function(error, result){
      res.render("authors/authors", {authors: result.rows});
    })
  });
};  