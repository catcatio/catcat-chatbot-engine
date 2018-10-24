import { IConfig } from '../config';

import { Server } from 'http'

export default async (config: IConfig, { webhookHandlers, fulfillmentHandlers }): Promise<IServer> => {
  const initExpress = require('./initExpress')
const routers = require('./routers')
  let _server: Server

  const start = async () => {
    const { app, server } = await initExpress(config)
    _server = server
    app.use(routers({ webhookHandlers, fulfillmentHandlers }))
    console.log('server started')
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

export interface IServer {
  start()
  stop()
}