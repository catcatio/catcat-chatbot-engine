import { IChatServerConfig } from '../config';
declare const _default: (config: IChatServerConfig) => Promise<IChatServer>;
export default _default;
export interface IChatbot {
    name: string;
    providersConfig: any;
    messageHandler: any;
    fulfillmentHandler: any;
}
export interface IChatServer {
    start: any;
    stop: any;
    register: any;
}
