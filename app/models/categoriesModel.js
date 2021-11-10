function Categories(connection){
  this._client = connection();
}

Categories.prototype.getCategory = async function(category,callback){
  await this._client.query('select * from categories where id = ' + category.id, callback);
};

Categories.prototype.getCategories = async function(callback){
 await this._client.query('select * from categories', callback);
};

Categories.prototype.saveCategory = async function(category, callback){
  const sql = 'INSERT INTO categories(category) VALUES ($1);';
  await this._client.query(sql, [category.category], callback);
};

Categories.prototype.deleteCategory = async function(category, callback){
  console.log(category.id);
  await this._client.query('DELETE FROM categories where id = ' + category.id, callback);
};

module.exports = function(){
  return Categories;
}