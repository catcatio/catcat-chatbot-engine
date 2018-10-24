import { IParsedMessage } from './EventType';
import { IConfig } from '../../config';

const wrapLazyRequestHandler = (requestHandlerModule, messageHandlerAsync, config) => {
  const handler = require(`./${requestHandlerModule}`)(config, messageHandlerAsync)
  return async (req, res) => handler(req, res)
}

export = (config: IConfig, webhookProviders) => {
  const messageHandlerAsync = (handler) => async (prasedMessage: IParsedMessage, originalMessage: any) => {
    return await handler(prasedMessage, originalMessage) // to ensure messageHandler is a promise
  }

  const providers = config.chatProviders
  const { Router } = require('express')

  const keys = Object.keys(webhookProviders)
  const router = Router()

  keys.forEach(key => {
    const { messageHandler, providerConfigs } = webhookProviders[key]

    providers.forEach(provider => {
      console.log(`init messaging provider: ${provider}`)
      router.use(`/${key}/${provider}`, wrapLazyRequestHandler(provider, messageHandlerAsync(messageHandler), providerConfigs[provider]))
    })
  })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}