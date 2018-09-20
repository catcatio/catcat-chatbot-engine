const eventType = 'unfollow'

const handler = () =>
  (event) => {
    console.error(eventType, event)
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