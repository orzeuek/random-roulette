import express  from "express";
import _ from 'lodash';
import {NextHandleFunction} from "connect";

const DEFAULT_OPTIONS = {
    port: 3000,
    beforeAppStart: () => null,
    onListen: () => null,
    middlewares: [],
    routes: [],
};

interface Route {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head', // @todo make it better :D
    route: string,
    handler: (req: express.Request, res: express.Response) => void
}

export interface ServerOptions {
    port: number,
    middlewares: NextHandleFunction[],
    routes: Route[],
    beforeAppStart: (options: ServerOptions) => Promise<void>
    onListen: (app: express.Application, options: ServerOptions) => Promise<void>
}

export class Server {
    private readonly options: ServerOptions;
    private readonly app: express.Application;

    constructor(options: Partial<ServerOptions> = {}) {
        this.options = _.merge(DEFAULT_OPTIONS, options);
        this.app = express();
    }

    async run() {
        await this.options.beforeAppStart(this.options);

        for (const middleware of this.options.middlewares) {
            this.app.use(middleware);
        }

        for (const routeRule of this.options.routes) {
            const { method, route, handler } = routeRule;
            this.app[method](route, handler);
        }

        return new Promise<void>(resolve => this.app.listen(
            this.options.port,
            async () => {
                await this.options.onListen(this.app, this.options);
                resolve();
            }
        ));
    }
}
