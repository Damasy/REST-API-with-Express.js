const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Book = require("./models/bookModel");
const bookRouter = require('./routes/bookRouter')(Book);
const port = process.env.port || 3000;


app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

app.listen(port, () => {
  console.log("Running on port ", port);
});
