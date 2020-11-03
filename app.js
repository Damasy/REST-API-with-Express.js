const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost/bookAPI");
const bookRouter = express.Router();
const port = process.env.port || 3000;
const Book = require("./models/bookModel");

bookRouter.route("/Books").get((req, res) => {
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

bookRouter.route("/Books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

app.listen(port, () => {
  console.log("Running on port ", port);
});
