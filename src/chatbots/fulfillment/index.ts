export = (fulfillmentHandlers) => {
  const { Router } = require('express')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')

  const router = Router()
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  router.use(cookieParser())

  const keys = Object.keys(fulfillmentHandlers)
  keys.forEach(key => {
    router.use(`/${key}`, fulfillmentHandlers[key])
  })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}
