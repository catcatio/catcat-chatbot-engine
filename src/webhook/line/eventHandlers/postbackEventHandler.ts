const eventType = 'postback'

const handler = (lineClient, languageDetector) =>
  async (event) => {
    console.log(eventType)
    lineClient.replyMessage(event.replyToken, { type: 'text', text: eventType })
  }

export = {
  handler,
  eventType
}