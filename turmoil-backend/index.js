import {Server} from "./server.js";
import express from "express";

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const app = express();

app.get('/initializeStash', (req, res, next) => {
    let server = new Server(req, res);

    console.log("Will initialize stash");
    server.initializeStashExpress()
        .then(r => {
            res.send(r);
            console.log("Output sent");
        });
});

app.listen(3030);

console.log("Server started");