const eventType = '*'

const handler = () =>
  (event) => {
    console.error('unhandled event', JSON.stringify(event))
    return {
      replyToken: event.replyToken,
      message: '',
      eventType: 'unknown'
    }
  }

export = {
  eventType,
  handler
}
