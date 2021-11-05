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


  const {check, validationResult} = require('express-validator');

  application.get('/form_add_category', function(req,res){
    res.render('admin/form_add_category', {validator : undefined, category : {}});
  });

  application.post('/category/save', 
  [check('category')
  .notEmpty()
  .withMessage('Nome da categoria deve ser preenchido.')],
  function(req,res){
    var category = req.body;
    // validacao de dados
    const validator = validationResult(req);
    if(!validator.isEmpty()) {
        res.render("admin/form_add_category",{validator : validator, category : category});
      return;
    };
    var connection = application.config.dbConnection;
    var categoriesModel = new application.app.models.categoriesModel(connection);
    // salva nova categoria
    categoriesModel.saveCategory(category, function(error, result){
      res.redirect("/categorias");
    });
  });



};  