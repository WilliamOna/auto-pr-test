import { createServer } from "node:http";

const history = [];
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
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

  if (req.method === "GET" && req.url === "/mirror") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(history));
    return;
  }

  if (req.method === "GET" && req.url === "/mirror/count") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ count: history.length }));
    return;
  }

  if (req.method === "POST" && req.url === "/mirror") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }
      history.push(data);
      if (history.length > 10) {
        history.shift();
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    });
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
