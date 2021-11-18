const {check, validationResult} = require('express-validator');
module.exports = function(application) {

    // List  one Category
    application.get('/categoria/mostra', 
    (req,res) => application.app.controllers.categories.category(application, req, res));
  
  // List  all Categories
  application.get('/categorias/lista', 
                  (req,res) => application.app.controllers.categories.categories(application, req, res));

  // create/update category
  application.get('/categoria', 
  (req,res) => {
    if (req.query.id == undefined ) {
      application.app.controllers.categories.createForm(application, req, res);
    } else {
      application.app.controllers.categories.updateForm(application, req, res);
    };
  });                  

  // create 
  application.post('/categoria/novo', 
    [check('category')
    .notEmpty()
    .withMessage('Nome da categoria deve ser preenchido.')],
    (req,res)=> application.app.controllers.categories.create(application, req, res));

  // Update
  application.post('/categoria/:id', 
  [check('category')
  .notEmpty()
  .withMessage('Nome da categoria deve ser preenchido.')],
  (req,res)=> application.app.controllers.categories.update(application, req, res));

    
    // Delete
  application.get('/categoria/apaga', 
                (req, res) => application.app.controllers.categories.delete(application, req, res));
};  