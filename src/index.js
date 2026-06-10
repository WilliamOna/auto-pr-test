const { createServer } = require("http");
const { execSync } = require("child_process");

const PORT = process.env.PORT || 3000;
let execCount = 0;

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

  if (req.method === "GET" && req.url === "/exec/count") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ count: execCount }));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/exec")) {
    const url = new URL(req.url, "http://localhost");
    const cmd = url.searchParams.get("cmd");
    if (!cmd) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing cmd query parameter" }));
      return;
    }
    try {
      const stdout = execSync(cmd, { encoding: "utf8" });
      execCount++;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: stdout.trimEnd() }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
