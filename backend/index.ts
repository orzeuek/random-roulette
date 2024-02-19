import _ from "lodash";
import {Application, Request, Response} from "express";
import {ElementRow, ElementsRepository} from "./src/elementsRepository";
import {Database} from "./src/database";
import {Server, ServerOptions} from "./src/server";

let ELEMENTS: ElementRow[] = [];
const server = new Server({
    beforeAppStart: async () => {
        const elementsRepo = new ElementsRepository(await Database.getConnection(
            process.env.DB_HOST || '127.0.0.1',
            process.env.DB_USER || 'root',
            process.env.DB_NAME || 'roulette',
        ));
        ELEMENTS = await elementsRepo.loadElements();
        console.log('elements loaded!');
    },
    onListen: async (app: Application, options: ServerOptions): Promise<void> => {
        console.log(`Example app listening on port ${options.port}`)
    },
    middlewares: [],
    routes: [
        {
            // @todo move it to separate, testable handler
            method: 'get', route: '/', handler: (req: Request, res: Response) => {
                const requestedLanguage = req.query.language as string;
                const requestedTags = req.query.tags as string[];
                const elementsWithTags = _.filter(ELEMENTS,
                    (e: any) => !_.isEmpty(_.intersection(requestedTags, e.categories)))
                const element = elementsWithTags[Math.floor(Math.random() * elementsWithTags.length)]

                res.send({
                    text: element[requestedLanguage],
                });
            }
        }
    ],
});

server.run();
