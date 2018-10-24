import * as express from 'express'
import { Server } from 'http'

export = ({ port }) =>
  new Promise<{ app: express.Express, server: Server }>((resolve, reject) => {
    console.log('init express')
    const app = express()

    const server = app.listen(port, (err: Error) => {
      if (err) {
        console.log(`Failed to start server on port ${port}`, err)
        reject(err)
      }

      console.log(`Listening http://localhost:${port}`)
      resolve({ app, server })
    })
  })
