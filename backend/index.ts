import configureDI from "./src/dependenciesContainer";
import {preLoad} from "./src/preLoad";
import {initRoutes} from "./src/routes";
import express from "express";

const app = express();
const port = 3000;

const diContainer = configureDI();

preLoad(app, diContainer)
    .then(() => {
            initRoutes(app, diContainer).then(() => {
                app.listen(port, () => {
                    console.log(`App listening on port ${port}`)
                });
            })
        }
    );