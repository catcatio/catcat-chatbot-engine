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

export = (providerConfigs, messageHandler) => {
  console.log('init webhook')
  const messageHandlerAsync = (handler) => async (prasedMessage: IParsedMessage, originalMessage: any) => {
    return await handler(prasedMessage, originalMessage) // to ensure messageHandler is a promise
  }

  const providers = getProviders(__dirname)
  const router = require('express').Router()
  providers
    .filter(provider => providerConfigs[provider])
    .forEach(provider => {
      console.log(`init chat provider: ${provider}`)
      router.use(`/${provider}`, wrapLazyRequestHandler(provider, messageHandlerAsync(messageHandler), providerConfigs[provider]))
    })

  router.use('/', (req, res) => res.status(401).send('hmm..'))
  return router
}