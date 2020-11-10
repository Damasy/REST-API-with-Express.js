function bookController(Book) {
  function post(req, res) {
    const book = new Book(req.body);

    if(!req.body.title) {
      res.status(400);
      res.send('Title is required');
    }

    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const returnBook = books.map(book => {
        const newBook = book.toJSON();
        console.log(newBook)
        newBook.link = {};
        newBook.link.self = `http://${req.headers.host}/api/books/${book['_id']}`;
        return newBook;
      })
      return res.json(returnBook);
    });
  }

  return {post, get};
}

module.exports = bookController;
