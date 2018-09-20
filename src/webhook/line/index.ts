import sessionIdHelper from "./sessionIdHelper";

const initApi = (config, messageHandlerAsync) => {
  const { Router } = require('express')
  const { Client, middleware } = require('@line/bot-sdk')

  const { json } = require('body-parser')
  const lineClient = new Client(config)
  const eventHandlers = require('./eventHandlers')()
  const middlewareWrapper = require('./middlewareWrapper').default
  const responder = require('./responder')

  const router = Router()
  // const lineMiddleware = middlewareWrapper(middleware(config))
  const lineMiddleware = middlewareWrapper(json())

  router.use(lineMiddleware)
  router.use('/', (req, res) => {
    let events = [].concat.apply([], req.body.events);
    let lnHandle = (parsedMessage, originalMessage) => {
      if (parsedMessage) {
        let replyToken = parsedMessage.replyToken;
        parsedMessage.sessionId = sessionIdHelper.makeSessionId(originalMessage)
        parsedMessage.source = 'line'

        return messageHandlerAsync(parsedMessage, originalMessage)
          .then(response => responder(replyToken, response, lineClient))
          .catch(console.error);
      }
    };

    return Promise.all(events.map(event => lnHandle(eventHandlers(event), event)))
      .then(() => res.send('OK')) // end of request)
  })
  return router
}

let line = null

export = (config, messageHandlerAsync) => {
  try { // lazy loading
    return line || (line = initApi(config, messageHandlerAsync))
  } catch (error) {
    console.error(error)
    console.error(error.stack)
  }
}