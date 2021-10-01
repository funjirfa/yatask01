const winston = require('winston');

const { customWinstonFormat } = require('./format');


const { printf } = winston.format;

module.exports = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: printf(({ level, message }) => customWinstonFormat(level, message)),
    }),
  ],
  exitOnError: false,
});
