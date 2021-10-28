module.exports = function(application) {

  application.get('/livro', function(req,res){
    var connection = application.config.dbConnection;
    var booksModel = application.app.models.booksModel;

    booksModel.getBook(connection, function(error, result){
      res.render("books/book", {book: result.rows[0]});
    })
  });

  application.get('/livros', function(req,res){
    var connection = application.config.dbConnection;
    var booksModel = application.app.models.booksModel;

    booksModel.getBooks(connection, function(error, result){
      res.render("books/books", {books: result.rows});
    })
  });
};  