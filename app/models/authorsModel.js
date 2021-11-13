// const { author } = require("../controllers/authors");
// Open connection
function Authors(connection){
  this._client = connection();
}
// Get one Author
Authors.prototype.getAuthor = async function(author, callback){
  await this._client.query('select * from authors where id = ' + author.id, callback);
  await this._client.end();
};
// Get all Authors
Authors.prototype.getAuthors = async function(callback){
  await this._client.query('select * from authors', callback);
  await this._client.end();
};
// Save one Author
Authors.prototype.saveAuthor = async function(author, callback){
  const sql = 'INSERT INTO authors(name, birthdate) VALUES ($1, $2);';
  await this._client.query(sql, [author.name, author.birthdate], callback);
};

// Delete one Author
Authors.prototype.deleteAuthor = async function(author, callback) {
  const sql = 'DELETE FROM authors WHERE id= ' + author.id
  await this._client.query(sql, callback);
}

// Find books with author
Authors.prototype.findBooks = async function(author, callback) {
  const sql = 'SELECT * FROM  books where authorid = ' + author.id;
  console.log(sql);
  await this._client.query(sql, callback);
}

// Close connection
Authors.prototype.end =  async function(book, callback){
  await this._client.end();
};

module.exports = function(){
  return Authors;
}