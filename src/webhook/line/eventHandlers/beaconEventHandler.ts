const eventType = 'beacon'

const handler = (lineClient) =>
  async (event) => {
    lineClient.replyMessage(event.replyToken,  { type: 'text', text: eventType })
  }

export = {
  handler,
  eventType
}