const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('../core/database');
const logger = require('../logger');
const { customMorganFormat } = require('../logger/format');


module.exports = class HTTPServer {
  app = express();

  constructor(routes) {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan(customMorganFormat, {
      stream: {
        write: (msg) => logger.debug(msg.trim())
      }
    }));
    this.app.use(routes);
  }

  run(port) {
    this.app.listen(port, () => {
      logger.debug(`*** HTTP-сервер запущен [${port}] ***`);
    })
  }
};
