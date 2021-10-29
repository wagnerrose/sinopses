module.exports = function(application){
  application.get('/form_add_publisher', function(req,res){
    res.render('admin/form_add_publisher');
  });
  application.post('/publishers/save', function(req,res){
    var publisher = req.body;
    var connection = application.config.dbConnection;
    var publishersModel = new application.app.models.publishersModel(connection);

    publishersModel.savePublisher(publisher, function(error, result){
      res.redirect('/editoras');
    });
  });
}