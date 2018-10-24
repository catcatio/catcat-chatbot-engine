import { Router } from 'express'

export = ({ providersConfigs, webhookHandler, fulfillmentHandler }) => {
  const router = Router()

  console.log('init routers')
  if (webhookHandler) {
    const handler = require('../webhook')(providersConfigs, webhookHandler)
    router.use('/webhook', (req, res) => handler(req, res))
  }
  if (fulfillmentHandler) {
    const handler = require('../fulfillment')(fulfillmentHandler)
    router.use('/fulfillment', (req, res) => handler(req, res))
  }
  return router
}