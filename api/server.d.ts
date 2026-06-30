declare module "../dist/server/server.js" {
  const server: {
    fetch(request: Request, ...args: any[]): Promise<Response>;
  };
  export default server;
}
