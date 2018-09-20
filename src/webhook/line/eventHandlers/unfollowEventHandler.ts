const eventType = 'unfollow'

const handler = () =>
  (event) => {
    console.error(eventType, event)
    return null
  }

export = {
  handler,
  eventType
}