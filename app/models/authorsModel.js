module.exports = function(){

  this.getAuthors = function(connection, callback){
    const client = connection();
    client.query('select * from authors', callback);
  };

  this.getAuthor = function(connection, callback){
    const client = connection();
    client.query('select * from authors where id = 1', callback);
  };

  this.saveAuthor = function(author, connection, callback){
    const client = connection();
    const sql = 'INSERT INTO authors(name, birthdate) VALUES ($1, $2);';
    client.query(sql, [author.name, author.birthdate], callback);
  };

  return this;
}