import express from 'express';
import path from 'path';
import config from '../shared/config';
import getUser from './helpers/get-user';
import routes from './routes';

export default (cb) => {
  const app = express();

  app.use('/javascripts', express.static(path.join(__dirname, '../../dist-client/javascripts')));
  app.use('/static', express.static(path.join(__dirname, '../../dist-client/static')));

  app.get('/user', (req, res) => {
    const {accessToken} = req.query;
    if (!accessToken) {
      res.status(400).send('AccessToken required.');
    } else {
      getUser(accessToken, res);
    }
  });

  app.use(routes);

  // development error handler
  // will print stacktrace
  if (app.get('env') !== 'PROD') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      /* eslint-disable no-console */
      console.log(err, err.message);
      /* eslint-enable */
    });
  }

  // example of handling 404 pages
  app.get('*', (req, res) => {
    res.status(404).send('Server.js > 404 - Page Not Found');
  });

  // global error catcher, need four arguments
  app.use((err, req, res) => {
    /* eslint-disable no-console */
    console.error('Error on request %s %s', req.method, req.url);
    console.error(err.stack);
    /* eslint-enable */
    res.status(500).send('Server error');
  });

  process.on('uncaughtException', evt => {
    /* eslint-disable no-console */
    console.log('uncaughtException: ', evt);
    /* eslint-enable */
  });

  const port = process.env.PORT || config.port;
  const server = app.listen(port, cb ? cb : () => {
    /* eslint-disable no-console */
    console.log(`Listening on port ${port}`);
    /* eslint-enable */
  });
  return server;
};