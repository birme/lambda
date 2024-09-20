import {
  Static,
  Type,
  TypeBoxTypeProvider
} from '@fastify/type-provider-typebox';
import fastify, { FastifyPluginCallback } from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import apiUpload from './api_upload';

const HealthCheckResponse = Type.Object({
  message: Type.String()
});

const healthcheck: FastifyPluginCallback = (fastify, opts, next) => {
  fastify.get<{ Reply: Static<typeof HealthCheckResponse> }>(
    '/',
    {
      schema: {
        description: 'Say hello',
        response: {
          200: HealthCheckResponse
        }
      }
    },
    async (_, reply) => {
      reply.send({
        message: 'I am alive!'
      });
    }
  );
  next();
};

export default () => {
  const api = fastify({
    ignoreTrailingSlash: true
  }).withTypeProvider<TypeBoxTypeProvider>();

  api.register(cors);
  api.register(swagger, {
    swagger: {
      info: {
        title: 'Lambda',
        description: 'Run stuff',
        version: 'v1'
      }
    }
  });
  api.register(swaggerUI, {
    routePrefix: '/docs'
  });
  api.register(healthcheck);
  api.register(apiUpload);

  return api;
};
