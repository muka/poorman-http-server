#!/usr/bin/env node


import express, { Request, Response } from 'express';
import { newLogger } from './logger.js';

const logger = newLogger('http-server')

export default (dir: string, port = 3000) => {
  const app = express();

  app.use(express.static(dir))

  return new Promise<void>((resolve) => {
    app.listen(port, () => {
      logger.info(`Serving ${dir} at http://localhost:${port}`);
      resolve()
    });
  })
}

