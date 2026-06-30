import { promises as fs } from "fs";
import * as path from "path";
import type { IncomingMessage, ServerResponse } from "http";

const projectRoot = process.cwd();
const serverPromise = import("../dist/server/server.js") as Promise<{
  default: { fetch(request: Request, ...args: any[]): Promise<Response> };
}>;
const candidateRoots = [
  path.join(projectRoot, "dist", "client"),
  path.join(projectRoot, "..", "dist", "client"),
  path.join(projectRoot, "..", "..", "dist", "client"),
  path.join(projectRoot, "..", "..", "..", "dist", "client"),
  path.join(projectRoot, "..", "..", "..", "..", "dist", "client"),
];
let clientDistRoot = candidateRoots[0];

async function resolveClientDistRoot(): Promise<string> {
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

const mimeMap: Record<string, string> = {
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

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return mimeMap[ext] || "application/octet-stream";
}

async function serveStatic(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const clientRoot = await resolveClientDistRoot();
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  if (pathname === "/") {
    return false;
  }

  let filePath: string;
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
    res.statusCode = 200;
    res.setHeader("content-type", getContentType(filePath));
    res.setHeader("cache-control", "public, max-age=3600");
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const staticServed = await serveStatic(req, res);
  if (staticServed) {
    return;
  }

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url || "/"}`;

  const requestBody: ArrayBuffer | undefined =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : await new Promise<ArrayBuffer | undefined>((resolve, reject) => {
          const chunks: Uint8Array[] = [];
          req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
          req.on("end", () => resolve(chunks.length ? Buffer.concat(chunks).buffer : undefined));
          req.on("error", reject);
        });

  const request = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: requestBody,
  });

  const server = (await serverPromise).default;
  const response = await server.fetch(request, undefined, undefined);

  res.statusCode = response.status;
  response.headers.forEach((value: string, name: string) => {
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
