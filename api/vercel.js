import server from "jeasx/serverless.js";

export default async (req, res) => {
  await server.ready();
  server.server.emit("request", req, res);
};
