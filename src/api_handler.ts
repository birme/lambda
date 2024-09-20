import { FastifyPluginCallback } from 'fastify';

export interface Event {
  body: string;
  headers: Record<string, string>;
  httpMethod: string;
}

export interface Response {
  body: string;
  headers: Record<string, string>;
}

const apiHandler: FastifyPluginCallback = (fastify, opts, next) => {
  fastify.all('/event', async (req, reply) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const handler = require('../runner/index').handler;
      const result: Response = await handler({
        body: req.body,
        query: req.query,
        headers: req.headers,
        httpMethod: req.method
      });
      if (result.headers) {
        reply.headers(result.headers);
      }
      reply.code(200).send(result.body);
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });
  next();
};

export default apiHandler;
