const eventType = 'follow'

const handler = () =>
  (event) => {
    console.log(eventType, event)
    return {
      replyToken: event.replyToken,
      message: '',
      type: eventType
    }
  }

export = {
  handler,
  eventType
}