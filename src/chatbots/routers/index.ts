const { Router } = require('express')

export = (config, { messageHandler, fulfillmentHandler }) => {
  const router = Router()

  console.log('init routers')
  messageHandler && router.use(`/webhook`, (req, res) => require(`../webhook`)(config, messageHandler)(req, res))
  fulfillmentHandler && router.use(`/fulfillment`, (req, res) => require(`../fulfillment`)(config, fulfillmentHandler)(req, res))
  return router
}