const eventType = 'unfollow'

const handler = (lineClient) =>
  async (event) => {
    console.log(eventType)
  }

export = {
  handler,
  eventType
}