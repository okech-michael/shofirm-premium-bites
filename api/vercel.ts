import server from "../dist/server/server.js";

export default async function handler(req, res) {
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
