module.exports = function(app){
  app.get('/form_add_author', function(req,res){
    res.render('admin/form_add_author');
  });
};