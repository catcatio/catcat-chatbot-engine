export interface IConfig {
  port: number,
  chatProviders: string[],
}

export interface ILineConfig {
  channelAccessToken: string,
  channelSecret: string,
  channelId: string
}