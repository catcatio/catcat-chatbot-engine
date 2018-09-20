import { MessageType } from "../../EventType";

const eventType = 'message'

const handler = () =>
  (event) => {
    // TODO: to handle others type of messages
    let type = `${event.message.type}Message`
    return {
      replyToken: event.replyToken,
      message: event.message.text,
      type
    }
  }

export = {
  handler,
  eventType
}