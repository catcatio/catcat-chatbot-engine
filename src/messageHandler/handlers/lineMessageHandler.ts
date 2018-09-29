import { IConfig } from '../../config'
import { IParsedMessage } from '../../chatbots/webhook/EventType'

// TODO: inject this
const welcomeMessageTemplate = (message, ...options) => {
  return {
    'type': 'text',
    'text': message,
    'quickReply': {
      'items': options.map(op => ({
        'type': 'action',
        'action': {
          'type': 'message',
          'label': op,
          'text': op
        }
      }))
    }
  }
}

export const messageHandler = (config: IConfig) =>
  async (prasedMessage: IParsedMessage, originalMessage: any)  => {
    const { message, userId, source, type } = prasedMessage
    console.log(`[${source}/${type}]\t${userId} --> ${message}`)

    if (type === 'follow') {
      // TODO: translate welcomeMessageTemplate
      return welcomeMessageTemplate(
        'ดีจ้า~ GDH 📚 ยินดีต้อนรับ\nลองป้อนคำว่า "แสดงรายการ" เพื่อแสดงรายการหนังดูนะ',
        'แสดงรายการ')
    }

    return null
  }