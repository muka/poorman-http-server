#!./node_modules/.bin/tsx

import 'dotenv/config';

import { InvalidArgumentError, Option, program } from 'commander';
import pkg from '../package.json' with { type: "json" };
import { newLogger } from '../src/logger.js';
import httpServer from '../src/http-server.js';

const logger = newLogger('lt')

type CliOpts = {
  port: number
  directory: string
}

const runClient = async (argv: CliOpts) => {

  if (typeof argv.port !== 'number') {
    logger.error('Invalid argument: `port` must be a number');
    process.exit(1);
  }
  
  // todo

  await httpServer(argv.directory, argv.port)

}

const main = async () => {

  const intParser = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }

  const portOption = new Option(
    '--port, -p <number>', 'Internal HTTP server port'
  )
  portOption.required = true
  portOption.defaultValue = 3000

  portOption.argParser(intParser)

  program
    .name('http-server')
    .version(pkg.version)
    .description('HTTP server')
    .addOption(portOption)
    .option('--directory, -d <string>', 'directory to serve', './public')
    .action(runClient)

  program.parse();
}

main().catch(e => logger.error(e))

