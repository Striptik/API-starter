require('dotenv').config();

// Extern depencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./src/Services/logger/logger');
const cookieParser = require('cookie-parser');

// Routes
const { router } = require('./src');

// Express 
const port = process.env.PORT || 3000;
const app = express();


// App initialisation
// Add Middlewares, Routing, Authentification, Logger, DB
const init = () => {
  // CORS
  app.use(cors());

  // Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Helmet
  app.use(helmet());
  // others nidleware : https://github.com/helmetjs/helmet

  // Logger // morgan -> winston 
  app.use(morgan('dev', { stream: logger.stream }));

  // Cookie parser
  app.use(cookieParser());

  // Mongoose

  // Passport

  // API routes

  app.use('/', router);

  app.listen(port, () => {
    // Replace by logger
    logger.info(`App is running on port ${port}`, { tags: ['startup', 'init'] });
  });
};

init();

// #Handle Uncaught Exception
process.on('uncaughtException', (err) => {
  // handle the error safely
  logger.error(err, { tags: ['uncaughtException', 'fatal-error'] });
});

dcsc