const {check, validationResult} = require('express-validator');
module.exports = function(application) {
  
  // Read one Category
  application.get('/categoria', function(req,res){
    application.app.controllers.categories.category(application, req, res);
  });

  // Read all Categories
  application.get('/categorias', function(req,res){
    application.app.controllers.categories.categories(application, req, res);
  });
  // Create
  application.get('/form_add_category', function(req,res){
    application.app.controllers.categories.form_add_category(application, req, res);
  });

  // Save
  application.post('/category/save', 
    [check('category')
    .notEmpty()
    .withMessage('Nome da categoria deve ser preenchido.')],
    function(req,res){
      application.app.controllers.categories.category_save(application, req, res);
  });

  // Delete
  application.get('/categoria/apagar', function(req, res) {
    application.app.controllers.categories.delete(application, req, res);
  });
};  