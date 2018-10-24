import { IConfig } from '../config'
import { default as server, IServer } from './server';

export const create = async (config: IConfig, { messageHandler, fulfillmentHandler }): Promise<IServer> => {
  return server(config, { messageHandler, fulfillmentHandler })
}
