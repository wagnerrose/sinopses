module.exports = function(app){
  app.get('/form_add_publisher', function(req,res){
    res.render('admin/form_add_publisher');
  });
};