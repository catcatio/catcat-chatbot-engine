require('dotenv/config')
import { config } from './config'

import * as chatbots from './chatbots'
import * as fulfillmentHandler from './fulfillmentHandler'
import messageHandler from './messageHandler'

chatbots.create(config, { messageHandler: messageHandler(config), fulfillmentHandler })
  .then(bots => {
    process.on('SIGTERM', () => {
      console.info('SIGTERM signal received.');
      bots.stop()
    })
  })