import * as express from 'express'
import { Server } from 'http'
import { IConfig } from '../config';

export = (config :IConfig) =>
  new Promise<{ app: express.Express, server: Server }>((resolve, reject) => {
    console.log('init express')
    const app = express()

    const server = app.listen(config.port, (err: Error) => {
      if (err) {
        console.log(`Failed to start server on port ${config.port}`, err)
        reject(err)
      }

      console.log(`Listening http://localhost:${config.port}`)
      resolve({ app, server })
    })
  })
