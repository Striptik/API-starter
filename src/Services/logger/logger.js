
const winston = require('winston');
require('winston-loggly-bulk');

// #Remove previous logger console
winston.remove(winston.transports.Console);

// #Add new Console logger  
winston.add(winston.transports.Console, {
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
});

// #Add loggly support
winston.add(winston.transports.Loggly, {
  handleExceptions: true,
  level: process.env.LOGGLY_LEVEL,
  auth: { 
    username: process.env.LOGGLY_USERNAME,
    password: process.env.LOGGLY_PASSWORD,
  },
  inputToken: process.env.LOGGLY_API_KEY,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  tags: [
    process.env.LOGGLY_TAGS_ENV, 
    process.env.LOGGLY_TAGS_PROJECT, 
    process.env.LOGGLY_TAGS_USER,
  ],
  json: true,
});

// #Add File logger for Errors
winston.add(winston.transports.File, {
  filename: './error.log',
  level: 'error',
  handleExceptions: true,
  json: true,
  maxsize: 5242880,
  maxFiles: 5,
  colorize: true,
});


winston.exitOnError = false;

// Logger method for Morgan
winston.stream = {
  write: (message) => {
    winston.info(` MORGAN LOG : ${message.trim()}`);
  },
};

module.exports = winston;
