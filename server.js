import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';


import router from './components';

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


  // morgan

  // Logger

  // Mongoose

  // Passport

  // API routes

  app.use('/', router);

  app.listen(port, () => {
    // Replace by logger
    console.log(`App listenning on port ${port}`);
  });
};

init();

