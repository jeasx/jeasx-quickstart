import serverless from "jeasx/serverless.js";

await serverless.ready();

export default async (req, res) => {
  serverless.server.emit("request", req, res);
};
