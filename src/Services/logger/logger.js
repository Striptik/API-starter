

const { Logger, transports, format } = require('winston');
require('winston-loggly');

const logger = Logger({
  transports: [
    // Add error.log files for saving only errors
    transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: true,
    }),
    // Send to loggly
    transports.Loggly({
      inputToken: process.env.LOGGLY_API_KEY,
      subdomain: 'insightLab',
      tags: ['Insight Lab', (process.env.NODE_ENV || 'dev'), 'API', (process.env.USER || 'Team')],
      json: true,
    }),
  ],
  exitOnError: false,
});

// If we're not in production, show log in the console. 
if (process.env.NODE_ENV !== 'production') {
  logger.add(transports.Console({
    format: format.simple(),
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }));
}

// Logger method for Morgan
logger.stream = {
  write: (message, encoding) => {
    logger.info(` MORGAN LOG : ${message.trim()}`);
  },
};

export default logger;
