const eventType = 'follow'

const handler = () =>
  (event) => {
    console.log(eventType, event)
    return {
      replyToken: event.replyToken,
      message: '',
      eventType
    }
  }

export = {
  handler,
  eventType
}