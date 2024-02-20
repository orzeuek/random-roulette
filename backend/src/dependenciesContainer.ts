import {DIContainer} from "rsdi";
import {ElementsRepository} from "./elementsRepository";
import {Database} from "./database";
import {IDIContainer} from "rsdi/dist/types";
import {RollCommandHandler} from "./rollCommandHandler";
import * as mysql from "mysql2/promise";

export default function configureDI(): IDIContainer<{
    ElementsRepository: Promise<ElementsRepository>,
    mysqlConnection: Promise<mysql.Connection>,
    RollCommandHandler: Promise<RollCommandHandler>,
}> {
    return new DIContainer()
        .add('mysqlConnection',
            (container: object) => {
                return Database.getConnection(
                    process.env.DB_HOST || '127.0.0.1',
                    process.env.DB_USER || 'root',
                    process.env.DB_NAME || 'roulette',
                )
            }
        )
        .add(
            'ElementsRepository',
            async ({mysqlConnection}) => new ElementsRepository(await mysqlConnection)
        )
        .add(
            'RollCommandHandler',
            async ({ElementsRepository}) => new RollCommandHandler(await ElementsRepository)

        );
}