import { messageHandler as commonHandler } from './commonMessageHandler'
import { messageHandler as line } from './lineMessageHandler'
import { IConfig } from '../../config';
import { IParsedMessage } from '../../chatbots/webhook/EventType';

export const handlers = (config: IConfig) => {
  const messageHandlers = {
    line: line(config),
    common: commonHandler(config)
  }

  return async (prasedMessage: IParsedMessage, originalMessage: any) => {
    const { source } = prasedMessage

    const messageHandler = messageHandlers[source]

    const response = await messageHandler(prasedMessage, originalMessage)

    return response || messageHandlers.common(prasedMessage, originalMessage)
  }
}
