import { createServer } from "node:http";
import os from "node:os";

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

  if (req.method === "GET" && req.url === "/server-info") {
    let hostname;
    try {
      hostname = os.hostname();
    } catch {
      hostname = "unknown";
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      hostname,
      platform: process.platform,
      uptime: process.uptime(),
    }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
