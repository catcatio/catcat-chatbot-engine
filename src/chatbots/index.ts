import { IConfig } from '../config'

export const create = async (config: IConfig, {messageHandler, fulfillmentHandler}) => {
  const server = require('./server').default
  return server(config, {messageHandler, fulfillmentHandler}).then(instance => {
    instance.start()
    return instance
  })
}
