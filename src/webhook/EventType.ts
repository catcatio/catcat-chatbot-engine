export type MessageType = 'textMessage' | 'imageMessage' | 'videoMessage' | 'audioMessage' | 'fileMessage' | 'locationMessage' | 'stickerMessage' |
  'follow' | 'unfollow' | 'postback' | 'join' | 'leave' | 'postback' | 'beacon' | 'accountLink' | 'unknown'

export interface IParsedMessage {
  message?: string,
  type: MessageType,
  userId: string,
  source: string
}