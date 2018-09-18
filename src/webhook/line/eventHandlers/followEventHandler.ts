const eventType = 'follow'

const handler = (lineClient) =>
  async (event) => {
    console.log(eventType)
    lineClient.replyMessage(event.replyToken, { type: 'text', text: eventType })
  }

export = {
  handler,
  eventType
}