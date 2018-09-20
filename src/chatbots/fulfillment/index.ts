import { IConfig } from '../../config';

let router = null
export = (config: IConfig, fulfillmentHandler) => {
  if (router) return router
  const { Router } = require('express')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')

  router = Router()
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  router.use(cookieParser())

  const keys = Object.keys(fulfillmentHandler)
  keys.forEach(key => {
    router.use(`/${key}`, fulfillmentHandler[key](config))
  })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}