function Categories(connection){
  this._client = connection();
}
// Get one Category
Categories.prototype.getCategory = async function(category,callback){
  await this._client.query('select * from categories where id = ' + category.id, callback);
  await this._client.end();
};

// Get all Categories
Categories.prototype.getCategories = async function(callback){
 await this._client.query('select * from categories', callback);
 await this._client.end();
};

// Save one Category
Categories.prototype.saveCategory = async function(category, callback){
  const sql = 'INSERT INTO categories(category) VALUES ($1);';
  await this._client.query(sql, [category.category], callback);
  await this._client.end();
};

// Delete one Category
Categories.prototype.deleteCategory = async function(category, callback){
  console.log(category.id);
  await this._client.query('DELETE FROM categories where id = ' + category.id, callback);
  await this._client.end();
};

module.exports = function(){
  return Categories;
}