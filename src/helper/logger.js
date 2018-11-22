const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

export default logger;
