async function getCategories(application, connection) {
  let categoriesModel = new application.app.models.categoriesModel(connection);
  let categories;
  await categoriesModel.getCategories(function(error, result){
      categories = result.rows;
    });
  return categories;
};

async function getAuthors(application, connection){
  let authorsModel = new application.app.models.authorsModel(connection);
  let authors;
  await authorsModel.getAuthors( function(error, result){
    if(error){
      console.log(error.stack)
    } else {
      authors = result.rows;
    }
  });
  return authors;
}

async function getPublishers(application, connection){
  let publishersModel = new application.app.models.publishersModel(connection);
  let publishers;
  await publishersModel.getPublishers(function(error, result){
    if(error){
      console.log(error.stack)
    } else {
      publishers = result.rows;
    }
  });
  return publishers;
}

module.exports.book = function(application, req, res){
    let connection = application.config.dbConnection;
    let booksModel = new application.app.models.booksModel(connection);
    
    let find = req.query;

    booksModel.getBook(find, function(error, result){
      res.render("books/book", {book: result.rows[0]});
    })
    // connection.close();
}

module.exports.books = function(application, req, res){
    let connection = application.config.dbConnection;
    let booksModel = new application.app.models.booksModel(connection);
    
    booksModel.getBooks(function(error, result){
      res.render("books/books", {books: result.rows});
    })
}

// Create
module.exports.create = async function(application, req, res){
  // let connection = application.config.dbConnection;
  // let booksModel = new application.app.models.booksModel(connection);

  res.render('books/createBook', {validator : undefined});
}

  // Update
module.exports.update = async function(application, req, res){
  let connection = application.config.dbConnection;
  let booksModel = new application.app.models.booksModel(connection);

  let book;
  let find = req.query;
  if (find.id) {
    await booksModel.findBook(find, function(error, result){
      if(error){
        console.log(error.stack);
      } else {
        book = result.rows[0];
      };
    });
  }
  let categories = await getCategories(application, connection);
  let authors = await getAuthors(application, connection);
  let publishers = await getPublishers(application, connection);

  res.render('books/updateBook', {validator : undefined, book : book, categories : categories, authors : authors, publishers : publishers  });
}
