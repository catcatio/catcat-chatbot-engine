import { IConfig } from '../config'
import { default as server, IServer } from './server';

export const create = async (config: IConfig, { webhookHandlers, fulfillmentHandlers }): Promise<IServer> => {
  return server(config, { webhookHandlers, fulfillmentHandlers })
}
