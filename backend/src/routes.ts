import {RollCommandHandler} from "./rollCommandHandler";
import * as core from "express-serve-static-core";
import {IDependencies} from "./dependenciesContainer";

export async function initRoutes(
    app: core.Express,
    diContainer: IDependencies,
): Promise<void> {
    const rollCommandHandler = await diContainer.get('RollCommandHandler') as RollCommandHandler;
    app.route('/roll').get(rollCommandHandler.handle.bind(rollCommandHandler))
}
