const {check, validationResult} = require('express-validator');

// list one category
module.exports.category = function(application, req, res) {
  let connection = application.config.dbConnection;
  let categoriesModel = new application.app.models.categoriesModel(connection);

  let category = req.query;

  categoriesModel.getCategory(category, function(error, result){
    res.render("categories/category", {category: result.rows[0]});
  })
}

// List all categories
module.exports.categories = function(application, req, res){
    let connection = application.config.dbConnection;
    let categoriesModel = new application.app.models.categoriesModel(connection);

    categoriesModel.getCategories(function(error, result){
      res.render("categories/categories", {categories: result.rows});
    });
};

// Create Form
module.exports.createForm = function(application, req, res){
    res.render('categories/createCategory', {validator : undefined, category : {}});
};

// Update Form
module.exports.updateForm = function(application, req, res){
  var connection = application.config.dbConnection;
  var categoriesModel = new application.app.models.categoriesModel(connection);
  // obtem indice
  var category = req.query;
  // encontra registro e chama form update
  categoriesModel.getCategory(category,function(error, result){
    res.render("categories/updateCategory", {validator : undefined, category: result.rows[0]});
  })
};

// Create
module.exports.create = function(application, req, res){
    let category = req.body;
    // validacao de dados
    const validator = validationResult(req);
    if(!validator.isEmpty()) {
      res.render("categories/createCategory",{validator : validator, category : category});
    };

    // Instancia o modelo
    let connection = application.config.dbConnection;
    let categoriesModel = new application.app.models.categoriesModel(connection);
  
    // cria novo registro
    categoriesModel.create(category, function(error, result){
      res.redirect("/categorias/lista");
    }); 
}

// update
module.exports.update = function(application, req, res){
  let category = {} 
  category.category= req.body.category;
  category.id = req.params.id;

  // valida dados e retorna em caso de erro com mensagem
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
      res.render("categories/updateCategory",{validator : validator, category : category});
  };
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let categoriesModel = new application.app.models.categoriesModel(connection);

  // atualiza registro
  categoriesModel.update(category, function(error, result){
    res.redirect("/categorias/lista");
  });
}


// Delete
module.exports.delete = function(application, req, res){
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let categoriesModel = new application.app.models.categoriesModel(connection);
  // opten indice
  let category = req.query;

  categoriesModel.delete(category, function(error, result){ 
    res.redirect("/categorias/lista");
  });
}
