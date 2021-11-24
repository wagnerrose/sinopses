function Books(connection) {
  this._client = connection();
};
// Lista um livro
Books.prototype.getBook =  async function(book, callback){
  // uso de template string
  let sql = `select bk.id , bk.title, bk.publisheddate, 
     ath.name as author, pb.name as publisher, 
     ct.category as category, bk.synopsis
     from books as bk
     inner join authors as ath
     on bk.authorid = ath.id
     inner join publishers as pb
     on bk.publisherid = pb.id
     inner join categories as ct 
     on bk.categoriesid = ct.id
     where bk.id = ${book.id};`;

  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } 
};

// Lista todos os livros
 Books.prototype.getBooks = async function(callback){
  let sql = `
    SELECT bk.id , bk.title, ath.name AS author, pb.name AS publisher, ct.category AS category
   FROM books AS bk
   INNER JOIN authors AS ath
   ON bk.authorid = ath.id
   INNER JOIN publishers AS pb 
   ON bk.publisherid = pb.id
   INNER JOIN categories AS ct
   ON bk.categoriesid = ct.id;`;
  await this._client.query(sql, callback);
  await this._client.end();
};

// Grava um livro
Books.prototype.create = async function(book, callback){
  const sql = `
  INSERT INTO books
  (title, authorid, publisherid, publisheddate, isbn_13, categoriesid, synopsis)
  VALUES ('${book.title}', ${book.authorid}, ${book.publisherid},'${book.publisheddate}',
    ${book.isbn_13}, ${book.categoriesid}, '${book.synopsis}')`;
  
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// Atualiza um livro
Books.prototype.update = async function(book, callback){
  const sql = `
    UPDATE books 
    SET title = '${book.title}', authorid= ${book.authorid}, publisherid= ${book.publisherid}, 
      publisheddate= '${book.publisheddate}', isbn_13 = ${book.isbn_13},
      categoriesid= ${book.categoriesid},synopsis= '${book.synopsis}'
    WHERE id= ${book.id}`;

  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// Apaga um livro
Books.prototype.delete = async function(book) {
  const sql = `DELETE FROM books WHERE id=${book.id};`
  try {
    await this._client.query(sql);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// Encontra um livro
Books.prototype.findBook =  async function(book, callback){
  let sql = `SELECT * FROM books
    WHERE id = ${book.id};`;
  console.log('Find book sql', sql);
  try {
    await this._client.query(sql, callback);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

// dados do select categorias
Books.prototype.selectCategories = async function() {
  const sql = `SELECT id, category 
    FROM  categories;`
  try {
    let result = await this._client.query(sql);
    return result.rows
  } catch (error) {
    console.error(error.stack);
    return false;
  };
};

// dados do select autores
Books.prototype.selectAuthors = async function() {
  const sql = `SELECT id, name 
    FROM  authors;`
  try { 
    let result = await this._client.query(sql);
    return result.rows
  } catch (error) {
    console.error(error.stack);
    return false;
  };
};

// dados do select autores
Books.prototype.selectPublishers = async function() {
  const sql = `SELECT id, name 
    FROM  publishers;`
  try {
    let result = await this._client.query(sql);
    return result.rows
  } catch (error) {
    console.error(error.stack);
    return false;
  };
};


// encerra conexao
Books.prototype.end = async function() {
  await this._client.end();
}

module.exports = function() {
  return   Books;
}




