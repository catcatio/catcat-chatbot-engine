import { IChatServerConfig } from '../config'
import { default as server, IChatServer } from './server';

export default async (config: IChatServerConfig): Promise<IChatServer> => {
  return server( config )
}
