export = (lineClient, languageDetector) => {
  const messageEventHandler = require('./messageEventHandler')
  const followEventHandler = require('./followEventHandler')
  const unfollowEventHandler = require('./unfollowEventHandler')
  const postbackEventHandler = require('./postbackEventHandler')
  const beaconEventHandler = require('./beaconEventHandler')
  const defaultEventHandler = require('./defaultEventHandler')

  const eventHandlers = {
    [messageEventHandler.eventType]: messageEventHandler.handler(lineClient, languageDetector),
    [followEventHandler.eventType]: followEventHandler.handler(lineClient),
    [unfollowEventHandler.eventType]: unfollowEventHandler.handler(lineClient),
    [postbackEventHandler.eventType]: postbackEventHandler.handler(lineClient, languageDetector),
    [beaconEventHandler.eventType]: beaconEventHandler.handler(lineClient)
  }

  return (event) => {
    const eventHandler = eventHandlers[event.type] || defaultEventHandler.handler()
    return eventHandler(event)
  }
}