module.exports = function(){

  this.getBooks = function(connection, callback){
    const client = connection();
    var sql = "select bk.id , bk.title, ath.name as author, pb.name as publisher , sn.description as synopsis ";
    sql += "from books as bk ";
    sql += "inner join authors as ath ";
    sql += "on bk.authorid = ath.id ";
    sql += "inner join publishers as pb ";
    sql += "on bk.publisherid = pb.id ";
    sql += "inner join synopses as sn ";
    sql += "on bk.synopsisid = sn.id";
    client.query(sql, callback);
    console.log(sql)
  };

  this.getBook = async function(connection, callback){
    const client = await connection();
    await client.query('select * from books where id = 1', callback);
  };

  this.saveBook = async function(book, connection, callback){
    const client = await connection();
    const sql = 'INSERT INTO books(title, authorid, publisherid, publisheddate, category, isbn_13, imagelink) VALUES ($1, $2, $3, $4, $5, $6, $8);';
    client.query(sql, [book.title, book.authorid, book.publisherid, book.publisheddate, book.category, book.isbn_13, book.imagelink], callback);
  };

  return this;
}


