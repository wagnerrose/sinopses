module.exports = function(application) {

  application.get('/categoria', function(req,res){
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);

    categoriesModel.getCategory(function(error, result){
      res.render("categories/category", {category: result.rows[0]});
    })
  });

  application.get('/categorias', function(req,res){
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);

    categoriesModel.getCategories(function(error, result){
      res.render("categories/categories", {categories: result.rows});
    })
  });
};  