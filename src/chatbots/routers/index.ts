const { Router } = require('express')

export = (config, { messageHandler, fulfillmentHandler }) => {
  const router = Router()

  console.log('init routers')
  // apis.forEach(api => {
  //   console.log(`\tloading /${api}`)
  //   router.use(`/${api}`, (req, res) => require(`../${api}`)(config)(req, res))
  //   router.use(`/${api}`, (req, res) => require(`../${api}`)(config)(req, res))
  // })
  messageHandler && router.use(`/webhook`, (req, res) => require(`../webhook`)(config, messageHandler)(req, res))
  fulfillmentHandler && router.use(`/fulfillment`, (req, res) => require(`../fulfillment`)(config, fulfillmentHandler)(req, res))
  return router
}