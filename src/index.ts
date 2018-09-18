require('dotenv/config')

import { config } from './config'
import server from './server'

const serverInstace = server(config)
serverInstace.then(server => server.start()
  .catch(err => {
    console.error(err)
    process.exit(1)
  }))

serverInstace.then(server => process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.stop()
}))