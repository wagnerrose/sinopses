module.exports = function(app) {
  var modelNoticias = require('../../config/modelNoticias');

  app.get('/noticias', function(req,res){
    var Noticias = app.config.dbConnection()

    connection.sync().then(function() {
      Noticias.findAll().then(function(result) {
          res.render('noticias/noticias', {noticias: result});
      });
    });
  });
};


