module.exports.book = function(application, req, res){
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);
    
    booksModel.getBook(function(error, result){
      res.render("books/book", {book: result.rows[0]});
    })
}

module.exports.books = function(application, req, res){
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);
    
    booksModel.getBooks(function(error, result){
      res.render("books/books", {books: result.rows});
    })
}