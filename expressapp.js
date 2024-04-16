const express = require("express");

const app = express();

const port = 3001;

app.use((req, res, next) => {
  console.log("Time:", new Date().toLocaleString());
  next();
});

app.use(
  "/time",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/time", (req, res) => {
  const date = new Date();
  let time = date.toLocaleTimeString();
  res.send(`The time is ${time}`);
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
