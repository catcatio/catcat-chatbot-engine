import { Router } from 'express'

export = (config, { webhookHandlers, fulfillmentHandlers }) => {
  const router = Router()

  console.log('init routers')
  if (webhookHandlers) {
    const handler = require('../webhook')(config, webhookHandlers)
    router.use('/webhook', (req, res) => handler(req, res))
  }
  if (fulfillmentHandlers) {
    const handler = require('../fulfillment')(config, fulfillmentHandlers)
    router.use('/fulfillment', (req, res) => handler(req, res))
  }
  return router
}