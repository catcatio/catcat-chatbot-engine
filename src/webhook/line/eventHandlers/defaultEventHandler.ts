const eventType = '*'

const handler = () => async (event) => {
  console.error('unhandled event', JSON.stringify(event))
  return null
}

export = {
  eventType,
  handler
}
