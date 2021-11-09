function Categories(connection){
  this._client = connection();
}

Categories.prototype.getCategory = function(category,callback){
  this._client.query('select * from categories where id = ' + category.id, callback);
};

Categories.prototype.getCategories = function(callback){
  this._client.query('select * from categories', callback);
};

Categories.prototype.saveCategory = function(category, callback){
  const sql = 'INSERT INTO categories(category) VALUES ($1);';
  this._client.query(sql, [category.category], callback);
};
module.exports = function(){
  return Categories;
}