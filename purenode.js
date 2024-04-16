const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  //   console.log(req.url);

  // Routes
  if (req.url === "/") {
    res.end("Hello World!");
  } else if (req.url === "/time") {
    const date = new Date();
    let time = date.toLocaleTimeString();
    res.write(`The time is ${time}`);
    res.end();
  } else {
    res.statusCode = 404;
    res.end("404 - Not found");
  }
});

server.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
