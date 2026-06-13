import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import server from "../dist/server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidateRoots = [
  path.join(process.cwd(), "dist", "client"),
  path.join(__dirname, "..", "dist", "client"),
  path.join(__dirname, "..", "..", "dist", "client"),
  path.join(__dirname, "..", "..", "..", "dist", "client"),
  path.join(__dirname, "..", "..", "..", "..", "dist", "client"),
];
let clientDistRoot = candidateRoots[0];

async function resolveClientDistRoot() {
  for (const candidate of candidateRoots) {
    try {
      await fs.access(candidate);
      clientDistRoot = candidate;
      return candidate;
    } catch {
      // ignore missing candidate
    }
  }

  let current = __dirname;
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(current, "dist", "client");
    try {
      await fs.access(candidate);
      clientDistRoot = candidate;
      return candidate;
    } catch {
      // ignore missing candidate
    }
    current = path.dirname(current);
  }

  return clientDistRoot;
}

const mimeMap = {
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
  woff2: "font/woff2",
  woff: "font/woff",
  ttf: "font/ttf",
  json: "application/json",
  txt: "text/plain",
  xml: "application/xml",
};

function getContentType(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return mimeMap[ext] || "application/octet-stream";
}

async function serveStatic(req, res) {
  const clientRoot = await resolveClientDistRoot();
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  if (pathname === "/") {
    return false;
  }

  let filePath;
  if (pathname === "/robots.txt") {
    filePath = path.join(clientRoot, "robots.txt");
  } else if (pathname.startsWith("/assets/")) {
    filePath = path.join(clientRoot, pathname.slice(1));
  } else if (pathname.match(/\.(js|css|jpg|jpeg|png|svg|webp|woff2|woff|ttf|json|txt|xml)$/i)) {
    filePath = path.join(clientRoot, pathname.slice(1));
  } else {
    return false;
  }

  try {
    const data = await fs.readFile(filePath);
    res.status(200);
    res.setHeader("content-type", getContentType(filePath));
    res.setHeader("cache-control", "public, max-age=3600");
    return res.send(data);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  const staticServed = await serveStatic(req, res);
  if (staticServed) {
    return;
  }

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url || "/"}`;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });

  const response = await server.fetch(request, undefined, undefined);

  res.status(response.status);
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  const body = await response.arrayBuffer();
  res.send(Buffer.from(body));
}
