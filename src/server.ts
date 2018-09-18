import { IConfig } from './config';

import { Server } from 'http'

export default async (config: IConfig) => {
  const initExpress = require('./initExpress')
  const routers = require('./routers')
  let _server: Server
  const start = async () => {
    const { app, server } = await initExpress(config)
    _server = server
    app.use(routers(config))

    app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })
  }

  const stop = async () => {
    _server && _server.close(() => {
      console.log('Http server closed.');
    });
  }

  return {
    start,
    stop
  }
}