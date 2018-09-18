const { Router } = require('express')

export = (config) => {
  const router = Router()
  const { apis } = config

  apis.forEach(api => router.use(`/${api}`, (req, res) => require(`../${api}`)(config)(req, res)))

  return router
}