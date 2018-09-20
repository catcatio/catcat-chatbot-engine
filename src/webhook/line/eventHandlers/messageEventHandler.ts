const eventType = 'message'

const handler = () =>
  (event) => {
    // TODO: to handle others type of messages
    return {
      replyToken: event.replyToken,
      message: event.message.text,
      eventType
    }
  }
export = {
  handler,
  eventType
}