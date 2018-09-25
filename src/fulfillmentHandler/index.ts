import * as intentHandlers from './intentHandlers'
import { request } from 'http';
import { IConfig } from '../config';
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

export const linepayconfirm = (config: IConfig) => {
  const lineClient = new Client(config.line)
  const lineMessageFormatter = require('./messageFormatter/lineMessageFormatter').default(config)

  const { transactionStore, linepay } = config
  return async (request, response) => {
    try {
      const transactionId = request.query.transactionId

      if (!transactionId) {
        console.error('bad request')
        return response.status(400).send('bad request')
      }

      const transaction = transactionStore[transactionId]

      if (!transaction) {
        console.error('transaction not found')
        return response.status(400).send('transaction not found')
      }

      const book = transaction.book
      book.readerLink = 'line://app/1599822021-XeRpEJg8'
      const confirmation = {
        transactionId: transactionId,
        amount: transaction.reservation.amount,
        currency: transaction.reservation.currency
      }

      const confirmResponse = await linepay.confirm(confirmation)
        .then(res => {
          console.log('payment succeeded')
          // transactionsRepository.update(transactionId, { status: 'completed', completedDate: Date.now() })
          return res
        })
        .catch(err => {
          console.error(err.message)
          console.log('payment failed')
          // transactionsRepository.update(transactionId, { status: 'failed', failedDate: Date.now(), reason: err.message, completedDate: Date.now() })
          return null
        })

      if (!confirmResponse) {
        console.error('EVENT_BOOK_ERROR')
        let msg = 'Sorry, something went wrong. We will get back to you asap.'
        await lineClient.pushMessage(transaction.userId, msg)
        return 'EVENT_BOOK_ERROR'
      }

      await lineClient.pushMessage(transaction.userId, lineMessageFormatter.messageTemplate(
        transaction.languageCode === 'th'
          ? lineMessageFormatter.quickReply('ขอบคุณที่สนับสนุนผู้เขียน ขอให้สนุกกับการอ่านนะ, อยากอ่านเลยรึเปล่า?', 'ยังก่อน', {
            type: 'action',
            action: {
              type: 'message',
              label: 'อ่านเลย',
              text: `อ่านหนังสือ ${transaction.bookTitle}`
            }
          })
          : lineMessageFormatter.quickReply('Thanks for purchase! Enjoy! Do you want to read it now', 'Not yet', {
            type: 'action',
            action: {
              type: 'message',
              label: 'Sure',
              text: `read book ${transaction.bookTitle}`
            }
          })
      ))
    } catch (error) {
      console.error(error)
    }
  }
}
