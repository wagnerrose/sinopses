function Books(connection) {
  this._client = connection();
};

 Books.prototype.getBooks = function(callback){
  var sql = "select bk.id , bk.title, ath.name as author, pb.name as publisher , sn.description as synopsis, ct.category as category ";
  sql += "from books as bk ";
  sql += "inner join authors as ath ";
  sql += "on bk.authorid = ath.id ";
  sql += "inner join publishers as pb ";
  sql += "on bk.publisherid = pb.id ";
  sql += "inner join synopses as sn ";
  sql += "on bk.synopsisid = sn.id ";
  sql += "inner join categories as ct ";
  sql += "on bk.categoriesid = ct.id;"
  this._client.query(sql, callback);
};

Books.prototype.getBook =  function(callback){
  this._client.query('select * from books where id = 1', callback);
};

Books.prototype.saveBook =  function(book, callback){
  const sql = 'INSERT INTO books(title, authorid, publisherid, publisheddate, category, isbn_13, imagelink) VALUES ($1, $2, $3, $4, $5, $6, $8);';
  this._client.query(sql, [book.title, book.authorid, book.publisherid, book.publisheddate, book.category, book.isbn_13, book.imagelink], callback);
};

module.exports = function() {
  return   Books;
}




