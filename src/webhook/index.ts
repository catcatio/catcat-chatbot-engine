import { IConfig } from '../config';
import { IParsedMessage } from './EventType';

let router = null

const wrapLazyRequestHandler = (requestHandlerModule, messageHandlerAsync, config) => {
  return async (req, res) => require(`./${requestHandlerModule}`)(config, messageHandlerAsync)(req, res)
}

export = (config: IConfig) => {
  if (router) return router
  const messageHandler = require('./messageHandler')

  const messageHandlerAsync = async (prasedMessage: IParsedMessage, originalMessage: any) => {
    return await messageHandler(prasedMessage, originalMessage) // to ensure messageHandler is a promise
  }

  const providers = config.providers
  const { Router } = require('express')

  router = Router()
  providers.forEach(provider => {
    console.log(`init messaging provider: ${provider}`)
    if (!config[provider]) {
      throw new Error(`Provider configuration not found: ${provider}`)
    }
    router.use(`/${provider}`, wrapLazyRequestHandler(provider, messageHandlerAsync, config[provider]))
  })
  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}