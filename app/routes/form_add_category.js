module.exports = function(application){
  application.get('/form_add_category', function(req,res){
    res.render('admin/form_add_category');
  });

  application.post('/category/save', function(req,res){
    var category = req.body;
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);

    categoriesModel.saveCategory(category, function(error, result){
      res.redirect("/categorias");
    });
  });
}
