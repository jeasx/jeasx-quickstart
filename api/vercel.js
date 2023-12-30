import serverless from "jeasx/serverless.js";

export default async (req, res) => {
  await serverless.ready();
  serverless.server.emit("request", req, res);
};
