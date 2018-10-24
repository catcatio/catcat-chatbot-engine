import { readdirSync, lstatSync } from 'fs'
import * as path from 'path'

import { IParsedMessage } from './EventType';

const wrapLazyRequestHandler = (requestHandlerModule, messageHandlerAsync, providerConfig) => {
  const handler = require(`./${requestHandlerModule}`)(providerConfig, messageHandlerAsync)
  return async (req, res) => handler(req, res)
}

const getProviders = (source) => {
  const isDirectory = source => lstatSync(source).isDirectory()
  return readdirSync(source).filter(d => isDirectory(path.join(source, d)))
}

export = (webhookProviders) => {
  const messageHandlerAsync = (handler) => async (prasedMessage: IParsedMessage, originalMessage: any) => {
    return await handler(prasedMessage, originalMessage) // to ensure messageHandler is a promise
  }

  const providers = getProviders(__dirname)
  const { Router } = require('express')

  const keys = Object.keys(webhookProviders)
  const router = Router()

  keys.forEach(key => {
    const { messageHandler, providerConfigs } = webhookProviders[key]

    providers
      .filter(provider => providerConfigs[provider])
      .forEach(provider => {
        console.log(`init messaging provider: ${provider}`)
        router.use(`/${key}/${provider}`, wrapLazyRequestHandler(provider, messageHandlerAsync(messageHandler), providerConfigs[provider]))
      })
  })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}