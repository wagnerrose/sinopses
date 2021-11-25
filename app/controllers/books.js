const {check, validationResult} = require('express-validator');
// Mostra um Livro 
module.exports.book = function(application, req, res){
  var connection = application.config.dbConnection;
  var booksModel = new application.app.models.booksModel(connection);

  let book = req.query;

  booksModel.getBook(book, function(error, result){
    res.render("books/book", {book: result.rows[0]});
  })
}

// Lista todos Livros
module.exports.books = function(validator,application, req, res){
  var connection = application.config.dbConnection;
  var booksModel = new application.app.models.booksModel(connection);

  booksModel.getBooks(function(error, result){
    res.render("books/books", {validator : validator, books: result.rows});
  })
}

// Create Form
module.exports.createForm = async function(application, req, res){
  const connection = application.config.dbConnection;
  const booksModel = new application.app.models.booksModel(connection);
  // preenche selectbox categorias, autores e editoras
  let selectCategories = await booksModel.selectCategories();
  let selectAuthors = await booksModel.selectAuthors();
  let selectPublishers = await booksModel.selectPublishers();

  res.render('books/createBook', {validator : undefined, book : {}, selectCategories : selectCategories, selectAuthors : selectAuthors, selectPublishers : selectPublishers  });
};

// Update Form
module.exports.updateForm = async function(application, req, res){
  const connection = application.config.dbConnection;
  const booksModel = new application.app.models.booksModel(connection);

  let selectCategories = await booksModel.selectCategories();
  let selectAuthors = await booksModel.selectAuthors();
  let selectPublishers = await booksModel.selectPublishers();

  // encontra registro e chama form update
  await booksModel.findBook(req.query, async function(error, result){
    res.render('books/updateBook', {validator : undefined, book : result.rows[0], selectCategories : selectCategories, selectAuthors : selectAuthors, selectPublishers : selectPublishers  });
    await booksModel.end();
  });
};

// Create
module.exports.create = async function(application, req, res){
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let booksModel = new application.app.models.booksModel(connection);
  let book = {} 
  book.title = req.body.title;
  book.authorid = req.body.authorid;
  book.publisherid = req.body.publisherid;
  book.publisheddate = req.body.publisheddate;
  book.isbn_13 = req.body.isbn_13;
  book.categoriesid = req.body.categoriesid;
  book.synopsis = req.body.synopsis;

  // validacao de dados
  const validator = validationResult(req);
  if(!validator.isEmpty()) {
    console.log('books controller create error', validator)
    let selectCategories = await booksModel.selectCategories();
    let selectAuthors = await booksModel.selectAuthors();
    let selectPublishers = await booksModel.selectPublishers();

    res.render('books/createBook', {
      validator : validator, 
      book : book,
      selectCategories : selectCategories,
      selectAuthors : selectAuthors,
      selectPublishers : selectPublishers 
    });
  } else {
    console.log('books controller create book', book);
    // cria novo registro
    booksModel.create(book, function(error, result){
      if(error){
        console.log('Controller book create error', error);
      }
      res.redirect("/livros/lista");
    });
  };
}

// update
module.exports.update = async function(application, req, res){
  // Instancia o modelo
  let connection = application.config.dbConnection;
  let booksModel = new application.app.models.booksModel(connection);

  let book = {} 
  book.title = req.body.title;
  book.authorid = req.body.authorid;
  book.publisherid = req.body.publisherid;
  book.sinopisid = req.body.sinopisisid;
  book.publisheddate = req.body.publisheddate;
  book.isbn_13 = req.body.isbn_13;
  book.categoriesid = req.body.categoriesid;
  book.synopsis = req.body.synopsis;
  book.id = req.params.id;
  console.log('Book Controller update ==>',req.body);

  // valida dados e retorna em caso de erro com mensagem
  let validator = validationResult(req);
  if(!validator.isEmpty()) {
      res.render("books/updateBook",{validator : validator, book : book});
  };

  // atualiza registro
  console.log('controller book', book)
  result = await booksModel.update(book);
  result ? validator = "Livro atualizado": validator = "Ocorreu um erro ao atualizar o livro."
  application.app.controllers.books.books(validator, application, req, res);
}

// Delete
module.exports.delete = async function(application, req, res){
  let connection = application.config.dbConnection;
  let booksModel = new application.app.models.booksModel(connection);
  let book = req.query;
  let validator
  // let result // retirar apos testes
  console.log('books controller delete book', book);
  let result = await booksModel.delete(book);
  result ? validator = "Livro apagado": validator = "Ocorreu um erro ao apagar o livro."
  console.log('books controller delete result', result);
  application.app.controllers.books.books(validator, application, req, res);
}
