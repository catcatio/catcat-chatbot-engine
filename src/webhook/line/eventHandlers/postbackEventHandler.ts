const eventType = 'postback'

const handler = () =>
  (event) => {
    console.log(eventType, event)
    return {
      replyToken: event.replyToken,
      message: event.message.text,
      type: eventType
    }
  }

export = {
  handler,
  eventType
}