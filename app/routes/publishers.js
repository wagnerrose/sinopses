const {check, validationResult} = require('express-validator');

module.exports = function(application) {

  // Le uma editora
  application.get('/editora/mostra', (req,res) => {
    application.app.controllers.publishers.publisher(application, req, res);
  });
  // le todas editoras
  application.get('/editoras/lista', (req,res) => {
    application.app.controllers.publishers.publishers(application, req, res);
  });

  // create/update editora
  application.get('/editora', 
  (req,res) => {
    if (req.query.id == undefined ) {
      application.app.controllers.publishers.createForm(application, req, res);
    } else {
      application.app.controllers.publishers.updateForm(application, req, res);
    };
  });                  

  // create 
  application.post('/editora/novo', 
    [check('name')
    .notEmpty()
    .withMessage('Nome da editora deve ser preenchida.')],
    (req,res)=> application.app.controllers.publishers.create(application, req, res));

  // Update
  application.post('/editora/:id', 
    [check('name')
    .notEmpty()
    .withMessage('Nome da editora deve ser preenchida.')],
    (req,res)=> application.app.controllers.publishers.update(application, req, res));

  // Delete
  application.get('/editora/apagar', (req, res) => {
    application.app.controllers.publishers.delete(application, req, res);
  });
};  


