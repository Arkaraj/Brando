const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const auth = require("./routes/auth");

// mongodb://localhost/Movie
mongoose.connect(
  `${process.env.URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Successfully connected to Database!!");
  }
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.use('/movies', movies)
app.use("/user", auth);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ msg: "API Working" });
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});
