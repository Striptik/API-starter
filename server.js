import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';


// Init DB => create db diretory
// Init port
// Add helmet


const app = express();


const init: Function = (): void => {
  // CORS
  app.use(cors());

  // Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use();

  // Helmet
  
};

init();

