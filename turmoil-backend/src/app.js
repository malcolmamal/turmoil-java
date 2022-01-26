import express from 'express';
import bodyParser from 'body-parser';
import Server from './server.js';
import sequelize from './configs/database.js';
import router from './routes/userRoutes.js';
import isAuthorized from './middleware/authMiddleware.js';
import Logger from './utils/logger.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const startServer = (port) => {
  const app = express();

  app.use((req, res, next) => {
    Logger.log('added cors 1');
    // const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'];
    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
  app.use(bodyParser.json()); // application/json

  app.use('/user', router);

  app.get('/initializeStash', isAuthorized, (req, res) => {
    const server = new Server(req, res);

    Logger.log('Will initialize stash');
    server.initializeStashExpress()
      .then((r) => {
        res.send(r);
        Logger.log('Output sent');
      });
  });

  app.use((error, req, res) => {
    Logger.log('got error', error);
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
  });

  sequelize.sync({ force: false })
    .then(() => {
      app.listen(port);
    })
    .catch((err) => {
      Logger.log(err);
    });

  Logger.log('Server started');
};

export default startServer;
