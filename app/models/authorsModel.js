// Open connection
function Authors(connection){
  this._client = connection();
};

// Get one Author
Authors.prototype.getAuthor = async function(author, callback){
  const sql = `SELECT * FROM authors WHERE id = ${author.id};`;

  try {
    await this._client.query(sql, callback); // send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};
// Get all Authors
Authors.prototype.getAuthors = async function(callback){
  const sql = 'SELECT * FROM authors;';

  try {
    await this._client.query(sql, callback); // send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Create one author
Authors.prototype.create = async function(author, callback){
  const sql = `INSERT INTO authors (name, birthdate) VALUES ($1, $2);`;

  try {
    await this._client.query(sql, [author.name, author.birthdate], callback); // send query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Update one author
Authors.prototype.update = async function(author, callback){
  const sql = `UPDATE authors SET name = $1, birthdate = $2 WHERE id= $3;`;

  try {
    await this._client.query(sql, [author.name, author.birthdate, author.id], callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await this._client.end();  // closes connection
  }
};

// Apaga um autor
Authors.prototype.delete = async function(author, callback) {
  const sql = `DELETE FROM authors WHERE id= ${author.id};`
  console.log('passei delete ===>>');
  // try {
  //   await this._client.query(sql, callback);
  //   return true;
  // } catch (error) {
  //   console.error(error.stack);
  //   return false;
  // } finally {
  //   await this._client.end();  // closes connection
  // }
};

// Pesquisa um autor
Authors.prototype.findBooks = async function(author, callback) {
  const sql = `SELECT * FROM  books where authorid=${author.id};`

  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  };
};
// encerra conexao
Authors.prototype.end = async function() {
  await this._client.end();
}

module.exports = function(){
  return Authors;
}
