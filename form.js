const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.post("/submit", (req, res) => {
  console.log("Submitted form data:");
  console.log("Name:", req.body.name);
  console.log("Email:", req.body.email);

  res.send("Form submitted successfully!");
});

app.use((req, res) => {
  res.send("404 - Not found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
