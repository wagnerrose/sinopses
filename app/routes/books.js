// const { Connection } = require("pg");

module.exports = function(application) {

  application.get('/livro', function(req,res){
    application.app.controllers.books.book(application, req, res);
  });

  application.get('/livros', function(req,res){
    application.app.controllers.books.books(application, req, res);
  });

    application.get('/form_add_book', function(req,res){
    res.render('books/form_add_book');
  });
  application.post('/books/save', function(req,res){
    var book = req.body;
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);

    booksModel.saveBooks(book, function(error, result){
      res.redirect("/livros");
    });
  });
};  