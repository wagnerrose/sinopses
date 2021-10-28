module.exports = function(){

  this.getBooks = async function(connection, callback){
    const client = await connection();
    await client.query('select * from books', callback);
  };

  this.getBook = async function(connection, callback){
    const client = await connection();
    await client.query('select * from books where id = 1', callback);
  };

  this.saveBook = async function(book, connection, callback){
    const client = await connection();
    const sql = 'INSERT INTO books(book, authorid, publisherid, publisheddate, category, isbs_13, imagelink) VALUES ($1, $2, $3, $4, $5, $6, $8);';
    await client.query(sql, book);
  };

  return this;
}