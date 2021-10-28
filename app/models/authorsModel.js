module.exports = function(){

  this.getAuthors = async function(connection, callback){
    const client = await connection();
    await client.query('select * from authors', callback);
  };

  this.getAuthor = async function(connection, callback){
    const client = await connection();
    await client.query('select * from authors where id = 1', callback);
  };

  this.saveAuthor = async function(author, connection, callback){
    const client = await connection();
    const sql = 'INSERT INTO authors(name, birthday) VALUES ($1, $2);';
    await client.query(sql, author);
  };

  return this;
}