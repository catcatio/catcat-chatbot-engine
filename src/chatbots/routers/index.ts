import { Router } from 'express'

export = ({ providerConfigs, messageHandler, fulfillmentHandler }) => {
  const router = Router()

  console.log('init routers')
  if (messageHandler) {
    const handler = require('../webhook')(providerConfigs, messageHandler)
    router.use('/webhook', (req, res) => handler(req, res))
  }
  if (fulfillmentHandler) {
    const handler = require('../fulfillment')(fulfillmentHandler)
    router.use('/fulfillment', (req, res) => handler(req, res))
  }

  router.use('/', (req, res) => res.send('hmm..'))
  return router
}