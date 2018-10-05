import * as intentHandlers from './intentHandlers'
import { IConfig } from '../config';
import * as request from 'request-promise-native'
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

export const blockbuster = (config) => {
  const lineClient = new Client(config.line)
  const moviesRepository = require('./moviesRepository')
  const lineMessageFormatter = require('./messageFormatter/lineMessageFormatter').default(config)
  const intentMap = new Map()

  Object.keys(intentHandlers).forEach(key => {
    intentMap.set(intentHandlers[key].intentName, intentHandlers[key].handler(moviesRepository, lineClient, lineMessageFormatter, config))
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

  const { transactionStore, linepay, userStore } = config
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

      userStore[transaction.userId] = Object.assign({}, { [transaction.movie.id]: true }, userStore[transaction.userId])

      await lineClient.pushMessage(transaction.userId, lineMessageFormatter.messageTemplate(
        transaction.languageCode === 'th'
          ? lineMessageFormatter.quickReply('ขอบคุณที่สนับสนุน GDH ขอให้สนุกกับหนังนะ, อยากรับชมเลยรึเปล่า?', 'ยังก่อน', {
            type: 'action',
            action: {
              type: 'message',
              label: 'ดูเลย',
              text: `ดูหนัง ${transaction.movieTitle}`
            }
          })
          : lineMessageFormatter.quickReply('Thanks for purchase! Enjoy! Do you want to watch it now', 'Not yet', {
            type: 'action',
            action: {
              type: 'message',
              label: 'Sure',
              text: `watch ${transaction.movieTitle}`
            }
          })
      ))
    } catch (error) {
      console.error(error)
    }
  }
}

export const linelogin = (config: IConfig) => {
  const { lineLogin, line } = config
  return async (req, res) => {
    console.log('linelogin')
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers))
    console.log('Dialogflow Request query: ' + JSON.stringify(req.query))
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body))
    const query = req.query
    const querystring = require('querystring')
    try {
      const form = {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: lineLogin.url,
        client_id: lineLogin.channelId,
        client_secret: lineLogin.channelSecret
      };

      const body = querystring.stringify(form);
      const accessTokenStr = await request({
        uri: 'https://api.line.me/oauth2/v2.1/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body
      })

      const accessToken = JSON.parse(accessTokenStr)
      console.log('accessToken', accessToken)
      console.log('accessToken.id_token', accessToken.id_token)
      var atob = require('atob');
      const id = !accessToken.id_token ? [] : accessToken.id_token.split('.', 2).map(t => JSON.parse(atob(t)))

      const profile = await request({
        uri: 'https://api.line.me/v2/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`
        },
        json: true
      })

      const friendship = await request({
        uri: 'https://api.line.me/friendship/v1/status',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`
        },
        json: true
      })

      /// HACK: not sure why lineClinet not work here.
      try {
        const c = await request({
          method: 'POST',
          uri: 'https://api.line.me/v2/bot/message/push',
          body: JSON.stringify({
            "messages": [{
              'type': 'text',
              'text': 'Thanks for logging in with us via LINE Login'
            }],
            "to": profile.userId
          }),
          headers: Object.assign({}, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${line.channelAccessToken}`
          }),
        })

        console.log(c)
      } catch (errr) {
        console.log(errr.message)
      }
      res.send({query, accessToken, id, profile, friendship })

    } catch (err) {
      console.log(err)
      res.send(err.message)
    }
  }
}