const { Router } = require('express')

export = (config) => {
  const router = Router()
  const { apis } = config
  console.log('init routers')
  apis.forEach(api => {
    console.log(`\tloading /${api}`)
    router.use(`/${api}`, (req, res) => require(`../${api}`)(config)(req, res))
  })
  return router
}