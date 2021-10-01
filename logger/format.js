const moment = require('moment');


const effects = {
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

const colors = {
  info: '\x1b[34m',
  error: '\x1b[31m',
  debug: '\x1b[32m',
};

const { bold, reset } = effects;
const timestamp = () => moment().format('YYYY-MM-DD HH:mm:ss (Z)');

const customWinstonFormat = (level, message) => {
  return `${bold}${colors[level]}${timestamp()}${reset} :: ${message}`;
};

const customMorganFormat = '[ :remote-addr ]  HTTP/:http-version  :method  :url  :user-agent';

module.exports = { customWinstonFormat, customMorganFormat };
