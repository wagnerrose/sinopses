function Authors(connection){
  this._client = connection();
}

Authors.prototype.getAuthor = function(author, callback){
  this._client.query('select * from authors where id = ' + author.id, callback);
};

Authors.prototype.getAuthors = function(callback){
  this._client.query('select * from authors', callback);
};

Authors.prototype.saveAuthor = function(author, callback){
  const sql = 'INSERT INTO authors(name, birthdate) VALUES ($1, $2);';
  this._client.query(sql, [author.name, author.birthdate], callback);
};
module.exports = function(){
  return Authors;
}