import { IConfig } from '../config'
import { IParsedMessage } from '../chatbots/webhook/EventType'
import { handlers } from './handlers'

export const messageHandler = (config: IConfig) => {
  const handleMessage = handlers(config)
  return async (prasedMessage: IParsedMessage, originalMessage: any) => {
    return handleMessage(prasedMessage, originalMessage)
  }
}