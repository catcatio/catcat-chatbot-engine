import { Router } from 'express'

export = ({ webhookHandlers, fulfillmentHandlers }) => {
  const router = Router()

  console.log('init routers')
  if (webhookHandlers) {
    const handler = require('../webhook')(webhookHandlers)
    router.use('/webhook', (req, res) => handler(req, res))
  }
  if (fulfillmentHandlers) {
    const handler = require('../fulfillment')(fulfillmentHandlers)
    router.use('/fulfillment', (req, res) => handler(req, res))
  }
  return router
}