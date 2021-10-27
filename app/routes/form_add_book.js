module.exports = function(app){
  app.get('/form_add_book', function(req,res){
    res.render('admin/form_add_book');
  });
};