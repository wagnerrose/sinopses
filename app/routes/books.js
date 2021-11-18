// const { Connection } = require("pg");

module.exports = function(application) {
  // Read one Book
  application.get('/livro/mostra', function(req,res){
    application.app.controllers.books.book(application, req, res);
  });

  // Read all Books
  application.get('/livros/lista', function(req,res){
    application.app.controllers.books.books(application, req, res);
  });

  // Create one Book
  application.get('/livro/novo', async function(req,res){
    application.app.controllers.books.create(application, req, res);
  });

  // Update one Book
  application.get('/livro', async function(req,res){
      application.app.controllers.books.create(application, req, res);
    });

  // Save one Book
  application.post('/books/create', function(req,res){
    let book = req.body;
    let connection = application.config.dbConnection;
    let booksModel = new application.app.models.booksModel(connection);

    booksModel.saveBook(book, function(error, result){
      res.redirect("/livros");
    });
  });

    // Save one Book
    application.post('/books/update', function(req,res){
      let book = req.body;
      let connection = application.config.dbConnection;
      let booksModel = new application.app.models.booksModel(connection);
  
      booksModel.saveBook(book, function(error, result){
        res.redirect("/livros");
      });
    });
};  
