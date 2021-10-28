module.exports = function(application){
  application.get('/form_add_book', function(req,res){
    res.render('admin/form_add_book');
  });
  application.post('/books/save', function(req,res){
    var book = req.body;
    var connection = application.config.dbConnection;
    var booksModel = application.app.models.booksModel;

    booksModel.saveBooks(book, connection, function(error, result){
      res.redirect("/livros");
    });
  });
}