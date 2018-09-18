const line: ILineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
}

const port = parseInt(process.env.PORT || '') || 3000
const apis = ['webhook']

export const config: IConfig = {
  port,
  line,
  apis
}

export interface IConfig {
  port: number,
  line?: ILineConfig,
  apis: string[]
}

export interface ILineConfig {
  channelAccessToken: string,
  channelSecret: string
}