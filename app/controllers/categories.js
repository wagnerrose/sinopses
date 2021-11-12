const {check, validationResult} = require('express-validator');
// Read one category
module.exports.category = function(application, req, res){
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);

    var category = req.query;

    categoriesModel.getCategory(category,function(error, result){
      res.render("categories/category", {category: result.rows[0]});
    })
    categoriesModel.close;
};

// Read all categories
module.exports.categories = function(application, req, res){
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);

    categoriesModel.getCategories(function(error, result){
      res.render("categories/categories", {categories: result.rows});
    });
};

module.exports.form_add_category = function(application, req, res){
    res.render('categories/form_add_category', {validator : undefined, category : {}});
};

// Save
module.exports.category_save = function(application, req, res){
    var category = req.body;
    // validacao de dados
    const validator = validationResult(req);
    if(!validator.isEmpty()) {
        res.render("categories/form_add_category",{validator : validator, category : category});
      return;
    };
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);
    // salva nova categoria
    categoriesModel.saveCategory(category, function(error, result){
      res.redirect("/categorias");
    });
}

// Delete
module.exports.delete = function(application, req, res){
  var connection = application.config.dbConnection;
  var categoriesModel = new application.app.models.categoriesModel(connection);

  var category = req.query;

  categoriesModel.deleteCategory(category, function(error, result){ 
    res.redirect("/categorias");
  });
}
