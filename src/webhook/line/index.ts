let line = null

const initApi = (config) => {
  const { Router } = require('express')
  const { Client } = require('@line/bot-sdk')
  const { json } = require('body-parser')
  const lineClient = new Client(config)
  const languageDetector = require('../languageDetector')
  const eventHandlers = require('./eventHandlers')(lineClient, languageDetector)

  const line = Router()
  line.use(json())
  line.use('/', (req, res) => {
    const events = req.body.events
    events && events.forEach(eventHandlers)
    res.send('OK')
  })
  return line
}

export = (config) => (req, res) => {
  try {
    if (!line) line = initApi(config)

    return line(req, res)
  } catch (error) {
    console.log(error)
    console.log(error.stack)
  }

}