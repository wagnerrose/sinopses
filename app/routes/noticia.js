module.exports = function(app) {
    var modelNoticias = require('../../config/modelNoticias');
  
    app.get('/noticia', function(req,res){
      var connection = app.config.dbConnection();
      var Noticia = modelNoticias(app);
  
      connection.sync().then(function() {
        Noticia.findByPk(1).then(function(result) {
            res.render('noticias/noticia', {noticia: result});
        });
      });
    });
  };
  