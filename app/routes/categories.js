const {check, validationResult} = require('express-validator');
module.exports = function(application) {
  
  // lista categoria
  application.get('/categoria', function(req,res){
    application.app.controllers.categories.category(application, req, res);
  });

  // lista categorias
  application.get('/categorias', function(req,res){
    application.app.controllers.categories.categories(application, req, res);
  });

  application.get('/form_add_category', function(req,res){
    application.app.controllers.categories.form_add_category(application, req, res);
  });

  application.post('/category/save', 
    [check('category')
    .notEmpty()
    .withMessage('Nome da categoria deve ser preenchido.')],
    function(req,res){
      application.app.controllers.categories.category_save(application, req, res);
  });

  application.get('/categoria/apagar', function(req, res) {
    application.app.controllers.categories.delete(application, req, res);
  });
};  