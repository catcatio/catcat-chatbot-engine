/// <reference types="node" />
import * as express from 'express';
import { Server } from 'http';
declare const _default: ({ port }: {
    port: any;
}) => Promise<{
    app: express.Express;
    server: Server;
}>;
export default _default;
