/* This file is an example. Delete it at will. */

import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

type RouteProps = {
  request: FastifyRequest;
  reply: FastifyReply;
};

declare module "@fastify/request-context" {
  interface RequestContextData {
    request: FastifyRequest;
    reply: FastifyReply;
  }
}
