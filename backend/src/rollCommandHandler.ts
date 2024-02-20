import {ElementsRepository} from "./elementsRepository";
import {Request, Response} from "express";
import _ from "lodash";

export class RollCommandHandler {
    private readonly repo: ElementsRepository;
    public constructor(elementsRepository: ElementsRepository) {
        this.repo = elementsRepository;
    }

    public handle(req: Request, res: Response): void {
        // @todo
        // add input validation
        // make it more testable....
        const requestedLanguage = req.query.language as string;
        const requestedTags = req.query.tags as string[];
        const elementsWithTags = _.filter(this.repo.elementsList,
            (e: any) => !_.isEmpty(_.intersection(requestedTags, e.categories)))
        const element = elementsWithTags[Math.floor(Math.random() * elementsWithTags.length)]

        res.send({
            text: element[requestedLanguage],
            ..._.pick(element, ['pl', 'en']),
        });
    }
}