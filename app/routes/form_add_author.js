module.exports = function(application){
  application.get('/form_add_author', function(req,res){
    res.render('admin/form_add_author');
  });

  application.post('/author/save', function(req,res){
    var author = req.body;
    var connection = application.config.dbConnection;
    var authorsModel = application.app.models.authorsModel;

    authorsModel.saveAuthor(author, connection, function(error, result){
      res.redirect("/autores");
    });
  });
}
