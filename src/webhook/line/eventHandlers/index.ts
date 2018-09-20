import randomString from '../../../utils/randomString'

export = () => {
  const messageEventHandler = require('./messageEventHandler')
  const followEventHandler = require('./followEventHandler')
  const unfollowEventHandler = require('./unfollowEventHandler')
  const postbackEventHandler = require('./postbackEventHandler')
  const beaconEventHandler = require('./beaconEventHandler')
  const defaultEventHandler = require('./defaultEventHandler')

  const eventHandlers = {
    [messageEventHandler.eventType]: messageEventHandler.handler(),
    [followEventHandler.eventType]: followEventHandler.handler(),
    [unfollowEventHandler.eventType]: unfollowEventHandler.handler(),
    [postbackEventHandler.eventType]: postbackEventHandler.handler(),
    [beaconEventHandler.eventType]: beaconEventHandler.handler()
  }

  const isSystemVerificationEvent = ({replyToken}) => {
    return replyToken === '00000000000000000000000000000000' ||
      replyToken === 'ffffffffffffffffffffffffffffffff'
  }

  const getUserId = (source) => {
    return source && source.userId
      ? source.userId
      : `???${randomString()}`
  }

  return (event) => {
    if (isSystemVerificationEvent(event)) return
    const eventHandler = eventHandlers[event.type] || defaultEventHandler.handler()
    return eventHandler(event)
  }
}