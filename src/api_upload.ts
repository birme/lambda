import { FastifyPluginCallback } from 'fastify';
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import multipart from '@fastify/multipart';
import { spawnSync } from 'child_process';

const pump = util.promisify(pipeline);

const apiUpload: FastifyPluginCallback = (fastify, opts, next) => {
  fastify.register(multipart);
  fastify.post('/upload', async (req, reply) => {
    try {
      const parts = req.files();
      for await (const part of parts) {
        if (part.filename.endsWith('.zip')) {
          await pump(
            part.file,
            fs.createWriteStream(`./runner/${part.filename}`)
          );
          spawnSync('unzip', ['-o', `./runner/${part.filename}`, '-d', './runner']);
        } else {
          reply.code(400).send({ message: 'Only zip files are allowed' });
          return;
        }
      }
      reply.code(200).send({ message: 'Files uploaded' });
    } catch (err) {
      reply.code(500).send({ message: err.message });
    }
  });
  next();
};

export default apiUpload;
