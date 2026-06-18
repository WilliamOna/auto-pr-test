const { createServer } = require("http");
const { readFileSync } = require("fs");
const { join } = require("path");

const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/config") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(pkg.config));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (req.method === "GET" && req.url === "/version") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ version: "1.0.0" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
