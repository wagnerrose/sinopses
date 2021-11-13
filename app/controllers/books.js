module.exports.book = function(application, req, res){
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);
    
    var book = req.query;

    booksModel.getBook(book, function(error, result){
      res.render("books/book", {book: result.rows[0]});
    })
    // connection.close();
}

module.exports.books = function(application, req, res){
    var connection = application.config.dbConnection;
    var booksModel = new application.app.models.booksModel(connection);
    
    booksModel.getBooks(function(error, result){
      res.render("books/books", {books: result.rows});
    })
}

// Create and update
module.exports.create = async function(application, req, res){
  var connection = application.config.dbConnection;
  var booksModel = new application.app.models.booksModel(connection);
  var authorsModel = new application.app.models.authorsModel(connection);
  var publishersModel = new application.app.models.publishersModel(connection);
  var categoriesModel = new application.app.models.categoriesModel(connection);
  let categories, authors, publishers;
  let book = req.query;
  if (req.query.id) {
    await booksModel.findBook(book, function(error, result){
      if(error){
        console.log(error.stack);
      } else {
        book = result.rows[0];
      };
    });
  }
 // carrega dados para os selects
 await categoriesModel.getCategories(function(error, result){
    if(error){
      console.log(error.stack)
    } else {
      categories = result.rows;
    }
  });
  await authorsModel.getAuthors( function(error, result){
    if(error){
      console.log(error.stack)
    } else {
      authors = result.rows;
    }
  });
  await publishersModel.getPublishers(function(error, result){
    if(error){
      console.log(error.stack)
    } else {
      publishers = result.rows;
    }
  });

  console.log(categories);
  res.render('books/form_book', {validator : undefined, book : book, categories : categories, authors : authors, publishers : publishers  });
}

