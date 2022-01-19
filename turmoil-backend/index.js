import express from "express";
import {Server} from "./server.js";
import {pool, sequelize} from "./configs/database.js";
import router from "./routes/user.js";

import {User} from './models/user.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const app = express();

const db = pool.promise();

app.use('/user', router);

app.get('/initializeStash', (req, res, next) => {
    let server = new Server(req, res);

    console.log("Will initialize stash");
    server.initializeStashExpress()
        .then(r => {
            res.send(r);
            console.log("Output sent");
        });
});

sequelize.sync()
    .then(result => {
        app.listen(3030);
    })
    .catch(err => {
        console.log(err);
    });

console.log("Server started");