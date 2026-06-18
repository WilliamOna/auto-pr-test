import { createServer } from "node:http";

const PORT = process.env.PORT || 3000;

const VALID_FORMATS = ["json", "pretty"];

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

  if (req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/debug") {
      const format = url.searchParams.get("format");

      if (format && !VALID_FORMATS.includes(format)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Invalid format '${format}'. Supported formats: ${VALID_FORMATS.join(", ")}` }));
        return;
      }

      const debugInfo = {
        argv: process.argv,
        cwd: process.cwd(),
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(debugInfo, null, format === "pretty" ? 2 : undefined));
      return;
    }
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
