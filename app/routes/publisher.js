module.exports = function(application) {

  application.get('/editora', function(req,res){
    var connection = application.config.dbConnection;
    var publishersModel = application.app.models.publishersModel;

    publihersModel.getPublisher(connection, function(error, result){
      res.render("publishers/publisher", {publisher: result.rows[0]});
    })
  });

  application.get('/editoras', function(req,res){
    var connection = application.config.dbConnection;
    var publishersModel = application.app.models.publishersModel;

    publishersModel.getPublishers(connection, function(error, result){
      console.log(result.rows);
      res.render("publishers/publishers", {publishers: result.rows});
    })
  });
};  