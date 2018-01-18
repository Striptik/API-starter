import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from './src/Services/logger/logger';


import router from './src';


const port = process.env.PORT || 3000;
const app = express();
dotenv.config();

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
  

  // Mongoose

  // Passport

  // API routes

  app.use('/', router);

  app.listen(port, () => {
    // Replace by logger
    logger.info('coucou !');
    console.log(`App listenning on port ${port}`);
  });
};

init();

