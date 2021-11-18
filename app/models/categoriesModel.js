function Categories(connection){
  this._client = connection();
}
// Get one Category
Categories.prototype.getCategory = async function(category,callback){
  sql = `SELECT * FROM categories WHERE id = ${category.id}`;
  try {
    await this._client.query(sql, callback);// send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }

};

// Get all Categories
Categories.prototype.getCategories = async function(callback){
  sql = 'SELECT * FROM categories;';
  try {
    await this._client.query(sql, callback);// send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Create one Category
Categories.prototype.create = async function(category, callback){
  let sql = `INSERT INTO categories(category) VALUES ($1);`;
  try {
    await this._client.query(sql, [category.category], callback); // send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Update one Category
Categories.prototype.update = async function(category, callback){
  let sql = `UPDATE categories SET category = $1 WHERE id= $2;`;
  try {
    await this._client.query(sql, [category.category, category.id], callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};


// Delete one Category
Categories.prototype.delete = async function(category, callback){
  let sql = `DELETE FROM categories WHERE id = ${category.id}`;
  console.log(sql)
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

module.exports = function(){
  return Categories;
}
