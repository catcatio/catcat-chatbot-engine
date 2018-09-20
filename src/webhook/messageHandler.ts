import { IParsedMessage } from "./eventType";

export const messageHandler = (prasedMessage: IParsedMessage, originalMessage: any) => {
  // TODO: Add bot logic here
  console.log('messageHandler', JSON.stringify(prasedMessage), JSON.stringify(originalMessage))
  return `Ok!! Got it. -> ${prasedMessage.message}`
}

module.exports = messageHandler