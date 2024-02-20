import {ElementsRepository} from "./elementsRepository";
import * as core from "express-serve-static-core";
import {IDependencies} from "./dependenciesContainer";

export async function beforeStart(app: core.Express, diContainer: IDependencies) {
    const elementsRepo: ElementsRepository = await diContainer.ElementsRepository;
    await elementsRepo.loadElements();
    console.log('elements loaded!');
}
