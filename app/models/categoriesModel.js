function Categories(connection){
  this._client = connection();
}

Categories.prototype.getCategory = function(callback){
  this._client.query('select * from categories where id = 1', callback);
};

Categories.prototype.getCategories = function(callback){
  this._client.query('select * from categories', callback);
};

Categories.prototype.saveCategory = function(category, callback){
  const sql = 'INSERT INTO categories(name, birthdate) VALUES ($1, $2);';
  this._client.query(sql, [category.name, author.birthdate], callback);
};
module.exports = function(){
  return Categories;
}