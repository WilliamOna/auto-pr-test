const { createServer } = require("http");

const PORT = process.env.PORT || 3000;

function truncate(value, maxLength = 100) {
  if (typeof value === "string" && value.length > maxLength) {
    return value.slice(0, maxLength) + "...";
  }
  return value;
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (req.method === "GET" && pathname === "/version") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ version: "1.0.0" }));
    return;
  }

  if (req.method === "GET" && pathname === "/env") {
    const env = {};
    for (const [key, value] of Object.entries(process.env)) {
      env[key] = truncate(value);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(env));
    return;
  }

  const envMatch = pathname.match(/^\/env\/(.+)$/);
  if (req.method === "GET" && envMatch) {
    const key = envMatch[1];
    const value = process.env[key];
    if (value === undefined) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Environment variable "${key}" not found` }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ key, value: truncate(value) }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
