module.exports = function(){

  this.getBooks = async function(connection, callback){
    const client = await connection();
    await client.query('select * from books', callback);
  };

  this.getBook = async function(connection, callback){
    const client = await connection();
    await client.query('select * from books where id = 1', callback);
  };

  return this;
}