module.exports = function(application){
  application.get('/form_add_author', function(req,res){
    res.render('admin/form_add_author');
  });

  application.post('/authors/save', function(req,res){
    var author = req.body;
    // req.body.check('birthdate').notEmpty();


    var connection = application.config.dbConnection;
    var authorsModel = new application.app.models.authorsModel(connection);

    authorsModel.saveAuthor(author, function(error, result){
      res.redirect("/autores");
    });
  });
}
