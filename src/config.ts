import { readFileSync } from "fs";
import { join } from "path";

const serviceAccountFile = join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS)
const { project_id } = JSON.parse(readFileSync(serviceAccountFile, 'utf-8'))

const line: ILineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
}

const googleProject = project_id
const port = parseInt(process.env.PORT || '') || 3000
const apis = ['webhook', 'fulfillment']
const providers = ['line']

export const config: IConfig = {
  port,
  line,
  apis,
  providers,
  googleProject
}

export interface IConfig {
  port: number,
  googleProject: string,
  line?: ILineConfig,
  apis: string[],
  providers: string[]
}
export interface ILineConfig {
  channelAccessToken: string,
  channelSecret: string
}