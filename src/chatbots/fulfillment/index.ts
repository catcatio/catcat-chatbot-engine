import { IConfig } from '../../config';

let router = null

export = (config: IConfig, fulfillmentHandler) => {
  if (router) return router
  const { Router } = require('express')
  router = Router()

  const keys = Object.keys(fulfillmentHandler)
  keys.forEach(key => {
    router.use(`/${key}`, fulfillmentHandler[key])
  })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}