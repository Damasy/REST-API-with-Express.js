const express = require("express");
const bookRouter = express.Router();

function routes(Book) {
  bookRouter.route("/books")
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

  bookRouter.use("/Books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route("/Books/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.title = req.body.title;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body["_id"]) {
        delete req.boy["_id"];
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const val = item[1];
        book[key] = val;
      });

      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if(err) {
          res.send(err);
        }
        return res.sendStatus(204);
      })
    })

  return bookRouter;
}

module.exports = routes;
