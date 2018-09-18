let router = null

export = (config) => {
  if (router) return router

  const { Router } = require('express')

  router = Router()
  const line = require('./line')(config)
  router.use('/line', line)
  router.use('/', (req, res) => res.status(401).send('thanks'))
  return router
}