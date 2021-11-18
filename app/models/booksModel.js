function Books(connection) {
  this._client = connection();
};
// Get one Book
Books.prototype.getBook =  async function(book, callback){
  // uso de template string
  let sql = `select bk.id , bk.title, bk.publisheddate, 
     ath.name as author, pb.name as publisher, 
     sn.description as synopsis, ct.category as category
     from books as bk
     inner join authors as ath
     on bk.authorid = ath.id
     inner join publishers as pb
     on bk.publisherid = pb.id
     inner join synopses as sn
     on bk.synopsisid = sn.id
     inner join categories as ct
     on bk.categoriesid = ct.id
     where bk.id = ${book.id};`;
  await this._client.query(sql, callback);
};

Books.prototype.findBook =  async function(book, callback){
  let sql = `SELECT * FROM books
    WHERE id = ${book.id};`;
  await this._client.query(sql, callback);
  await this._client.end();
};


// Get all Books
 Books.prototype.getBooks = async function(callback){
  let sql = `select bk.id , bk.title, ath.name as author, pb.name as publisher , sn.description as synopsis, ct.category as category
   from books as bk
   inner join authors as ath
   on bk.authorid = ath.id
   inner join publishers as pb 
   on bk.publisherid = pb.id
   inner join synopses as sn
   on bk.synopsisid = sn.id
   inner join categories as ct
   on bk.categoriesid = ct.id;`;
  await this._client.query(sql, callback);
  await this._client.end();
};

// Save one Book
Books.prototype.saveBook =  async function(book, callback){
  let sql = 'INSERT INTO books(title, authorid, publisherid, publisheddate, category, isbn_13, imagelink) VALUES ($1, $2, $3, $4, $5, $6, $8);';
  await this._client.query(sql, [book.title, book.authorid, book.publisherid, book.publisheddate, book.category, book.isbn_13, book.imagelink], callback);
  await this._client.end();
};

module.exports = function() {
  return   Books;
}




