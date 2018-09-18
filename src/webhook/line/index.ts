const initApi = (config) => {
  const { Router } = require('express')
  const { Client, middleware } = require('@line/bot-sdk')
  const lineClient = new Client(config)
  const eventHandlers = require('./eventHandlers')(lineClient)

  const router = Router()
  const lineMiddleware = middleware(config)
  router.use((req, res, next) => {
    try {
      const nextProxy = (err) => {
        if (err instanceof Error) {
          console.log(err.message)
          res.status(500).send(err.message)
        } else {
          next()
        }
      }
      // Check Line signature and convert body to JSON
      lineMiddleware(req, res, nextProxy)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  })

  router.use('/', (req, res) => {
    const events = req.body && req.body.events
    events && events.forEach(eventHandlers)
    res.send('OK') // end of request
  })
  return router
}

let line = null

export = (config) => {
  try {
    return line || (line = initApi(config))
  } catch (error) {
    console.error(error)
    console.error(error.stack)
  }
}