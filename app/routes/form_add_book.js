module.exports = function(app){
  app.get('/form_add_book', function(req,res){
    res.render('admin/form_add_book');
  });
  app.post('/books/save', function(req,res){
    var books = req.body;
    res.send(books);
  });
};