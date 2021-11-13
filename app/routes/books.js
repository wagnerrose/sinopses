// const { Connection } = require("pg");

module.exports = function(application) {
  // Read one Book
  application.get('/livro', function(req,res){
    application.app.controllers.books.book(application, req, res);
  });

  // Read all Books
  application.get('/livros', function(req,res){
    application.app.controllers.books.books(application, req, res);
  });

  // Create one Book
  application.get('/form_add_book', async function(req,res){
    application.app.controllers.books.create(application, req, res);
  });

  // Save one Book
  application.post('/books/save', function(req,res){
    var book = req.body;
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);

    booksModel.saveBooks(book, function(error, result){
      res.redirect("/livros");
    });
  });
};  