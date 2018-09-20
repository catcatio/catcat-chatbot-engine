import { SessionsClient } from 'dialogflow';
import { IParsedMessage } from "./EventType";
import languageDetector from '../utils/languageDetector';
import structjson from '../utils/dialogflow/structjson';
import { IConfig } from '../config';

const PLATFORM_UNSPECIFIED = 'PLATFORM_UNSPECIFIED'
const PLATFORM_LINE = 'LINE'

export const messageHandler = (config: IConfig) =>
  async (prasedMessage: IParsedMessage, originalMessage: any) => {
    const projectId = config.googleProject
    const { message, userId, source, type } = prasedMessage
    console.log(`[${source}/${type}]\t${userId} --> ${message}`)

    if (type !== 'textMessage') {
      return null
    }

    const sessionClient = new SessionsClient()
    const sessionPath = sessionClient.sessionPath(projectId, userId)
    console.log(sessionPath)
    const queryParamsPayload = {
      source: 'line',
      data: originalMessage
    }
    const query = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: message ? await languageDetector(message.substr(0, 12)) : 'en'
        },
      },
      queryParams: {
        // https://github.com/dialogflow/dialogflow-nodejs-client-v2/issues/9
        payload: structjson.jsonToStructProto(queryParamsPayload)
      }
    }

    return sessionClient.detectIntent(query)
      .then(response => {
        const result = response[0].queryResult
        console.log(JSON.stringify(response[0].queryResult))
        if (result.fulfillmentText) {
          console.log(`[${source}/${type}]\t${userId} <-- ${result.fulfillmentText}`)
          return result.fulfillmentText
        } else if (result.fulfillmentMessages && result.fulfillmentMessages.length > 0) {
          const replyMsgLine = result.fulfillmentMessages.find(f => f.platform === PLATFORM_LINE)
          const replyMsgUnknown = result.fulfillmentMessages.find(f => f.platform === PLATFORM_UNSPECIFIED)
          const replyMsg = replyMsgLine || replyMsgUnknown

          if (!replyMsg) { return }

          if (replyMsg.payload !== undefined) { // from dialogflow custom response
            const payload: any = structjson.structProtoToJson(replyMsg.payload)
            const linePayload = payload.line
            console.log(`[${source}/${type}]\t${userId} <-- ${JSON.stringify(linePayload)}`)
            return linePayload
          } else if (replyMsg.text !== undefined) {
            const msg = replyMsg.text
            console.log(`[${source}/${type}]\t${userId} <-- ${msg}`)
            return msg
          }
        }
      })
  }

module.exports = messageHandler