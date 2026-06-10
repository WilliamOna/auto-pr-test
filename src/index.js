const http = require("http");
const { spawn } = require("child_process");

const PORT = process.env.PORT || 3000;

let evalCount = 0;

const server = http.createServer((req, res) => {
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

  if (req.method === "GET" && req.url === "/eval/count") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ count: evalCount }));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/eval")) {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const code = url.searchParams.get("code");
    if (code === null) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing 'code' query parameter" }));
      return;
    }
    evalCount++;
    try {
      const result = eval(code);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
