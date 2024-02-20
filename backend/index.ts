import configureDI from "./src/dependenciesContainer";
import {beforeStart, initRoutes} from "./src/server";
import express from "express";

const app = express();
const port = 3000;

const diContainer = configureDI();

beforeStart(app, diContainer)
    .then(() => {
            initRoutes(app, diContainer).then(() => {
                app.listen(port, () => {
                    console.log(`App listening on port ${port}`)
                });
            })
        }
    );