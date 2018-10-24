const initApi = (lineConfig, messageHandlerAsync) => {
  const { Router } = require('express')
  const { Client, middleware } = require('@line/bot-sdk')

  const { json } = require('body-parser')
  const lineClient = new Client(lineConfig)
  const eventHandlers = require('./eventHandlers')()
  const middlewareWrapper = require('./middlewareWrapper').default
  const responder = require('./responder')

  const router = Router()
  // const lineMiddleware = middlewareWrapper(middleware(lineConfig))
  const lineMiddleware = middlewareWrapper(json())

  router.use(lineMiddleware)
  router.use('/', (req, res) => {
    let events = [].concat.apply([], req.body.events);
    let lnHandle = (parsedMessage, originalMessage) => {
      if (parsedMessage) {
        let replyToken = parsedMessage.replyToken;
        parsedMessage.source = 'line'

        return messageHandlerAsync(parsedMessage, originalMessage)
          .then(response => response && responder(replyToken, response, lineClient))
          .catch(console.error)
      }
    };

    return Promise.all(events.map(event => lnHandle(eventHandlers(event), event)))
      .then(() => res.send('OK')) // end of request)
  })
  return router
}

export = (lineConfig, messageHandlerAsync) => {
  try { // lazy loading
    return initApi(lineConfig, messageHandlerAsync)
  } catch (error) {
    console.error(error)
    console.error(error.stack)
  }
}