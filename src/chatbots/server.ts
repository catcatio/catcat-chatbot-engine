import { IChatServerConfig } from '../config';
import initExpress from './initExpress'
import { Router } from 'express'

export default async (config: IChatServerConfig): Promise<IChatServer> => {
  const routers = require('./routers')
  const botRouter = Router()
  let express: {
    app: any,
    server: any
  }

  const start = async () => {
    express = await initExpress(config)
    express.app.use(botRouter)
    express.app.use((req, res, next) => {
      const err = new Error('Not Found')
      const tmp = err as any
      tmp.status = 404
      next(err)
    })

    express.app.use((err, req, res, next) => {
      const status = err.status || 500
      res.status(status)
      res.send(`${status} ${err.message}`)
    })

    console.log('server started')
    return this
  }

  const stop = async () => {
    express.server.close(() => {
      console.log('Http server closed.');
    });

    return this
  }

  const register = async (chatbot: IChatbot) => {
    console.log(`register bot: ${chatbot.name}`)
    botRouter.use(`/${chatbot.name}`, routers(chatbot))
    return this
  }

  return {
    start,
    stop,
    register
  }
}

export interface IChatbot {
  name: string
  providersConfig: any
  messageHandler: any
  fulfillmentHandler: any
}

export interface IChatServer {
  start
  stop
  register
}