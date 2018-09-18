import { IConfig } from '../config';

let router = null

const wrapLazyRequestHandler = (requestHandlerModule, config) => {
  return async (req, res) => require(`./${requestHandlerModule}`)(config)(req, res)
}

export = (config: IConfig) => {
  if (router) return router

  const providers = ['line']
  const { Router } = require('express')

  router = Router()
  providers.forEach(provider => config[provider] && router.use(`/${provider}`, wrapLazyRequestHandler(provider, config[provider])))
  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}