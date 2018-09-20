import * as intentHandlers from './intentHandlers'
const { Client } = require('@line/bot-sdk')

const { WebhookClient } = require('dialogflow-fulfillment')

const getLanguageCode = request => {
  try {
    return request.body.queryResult.languageCode
  } catch (e) {
    return null
  }
}

const getQueryText = request => {
  try {
    return request.body.queryResult.queryText
  } catch (e) {
    return null
  }
}

const getUserId = request => {
  try {
    return request.body.originalDetectIntentRequest.payload.data.source.userId
  } catch (e) {
    return null
  }
}

export const bookshelf = (config) => {
  console.log(config)
  const lineClient = new Client(config.line)
  const lineMessageFormatter = require('./messageFormatter/lineMessageFormatter').default(config)
  const intentMap = new Map()

  Object.keys(intentHandlers).forEach(key => {
    intentMap.set(intentHandlers[key].intentName, intentHandlers[key].handler(lineClient, lineMessageFormatter, config))
  })

  return (request, response) => {
    try {
      console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
      console.log('Dialogflow Request body: ' + JSON.stringify(request.body))
      const agent = new WebhookClient({ request, response })

      // TODO: getUserId() platform wise support
      agent.userId = getUserId(request)
      agent.languageCode = getLanguageCode(request)
      agent.queryText = getQueryText(request)

      agent.handleRequest(intentMap)

    } catch (error) {
      console.error(error)
    }
  }
}

//
// books.purchase-yes
// books.shelf
// books.view