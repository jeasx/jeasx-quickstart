/* This file is an example. Feel free to delete it. */
import type { FastifyReply, FastifyRequest } from "fastify";
import "jeasx/serverless";

type RouteProps = {
  request?: FastifyRequest;
  reply?: FastifyReply;
};

type ThisContext = RouteProps & {
  // add additional attributes
};
