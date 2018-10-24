export interface IConfig {
  port: number,
  line?: ILineConfig,
  providers: string[],
}

export interface ILineConfig {
  channelAccessToken: string,
  channelSecret: string,
  channelId: string
}