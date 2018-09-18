export = (lineClient) => {
  const messageEventHandler = require('./messageEventHandler')
  const followEventHandler = require('./followEventHandler')
  const unfollowEventHandler = require('./unfollowEventHandler')
  const postbackEventHandler = require('./postbackEventHandler')
  const beaconEventHandler = require('./beaconEventHandler')
  const defaultEventHandler = require('./defaultEventHandler')

  const eventHandlers = {
    [messageEventHandler.eventType]: messageEventHandler.handler(lineClient),
    [followEventHandler.eventType]: followEventHandler.handler(lineClient),
    [unfollowEventHandler.eventType]: unfollowEventHandler.handler(lineClient),
    [postbackEventHandler.eventType]: postbackEventHandler.handler(lineClient),
    [beaconEventHandler.eventType]: beaconEventHandler.handler(lineClient)
  }

  const isSystemVerificationEvent = ({replyToken}) => {
    return replyToken === '00000000000000000000000000000000' ||
      replyToken === 'ffffffffffffffffffffffffffffffff'
  }

  return (event) => {
    if (isSystemVerificationEvent(event)) return
    const eventHandler = eventHandlers[event.type] || defaultEventHandler.handler()
    return eventHandler(event)
  }
}