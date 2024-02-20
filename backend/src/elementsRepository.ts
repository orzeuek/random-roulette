import * as mysql from 'mysql2/promise';

export interface ElementRow {
    pl: string,
    en: string,
    categories: string[],
}

export class ElementsRepository {
    private readonly db: mysql.Connection;
    private elements: ElementRow[];

    constructor(db: mysql.Connection) {
        this.db = db;
        this.elements = [];
    }

    public async loadElements(): Promise<ElementRow[]> {
        // @todo
        // a bit hacky in terms of types - fix it at some point ....
        const [rows, ]: [ElementRow[]] = await this.db.execute(
            'SELECT * FROM `elements`'
        ) as any;

        this.elements = rows;
        return this.elements;
    }

    get elementsList() {
        return this.elements;
    }
}