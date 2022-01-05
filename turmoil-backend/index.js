import {Server} from "./server.js";
import express from "express";
import {whatever, something} from "./other.js";

import {templateApp} from "./templating.js";

import path from "path";

const app = express();

app.set("view engine", "pug");
app.set('views', 'views');

app.use(templateApp);

console.log("some", whatever());

//app.use(express.json());
//app.use(express.urlencoded());

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/initializeStash', (req, res, next) => {
    let server = new Server(req, res);

    console.log("Will initialize stash");
    server.initializeStashExpress()
        .then(r => {
            res.send(r);
            console.log("Output sent");
            whatever();
            console.log('additional something', something);
        });
});

app.listen(3030);

console.log("Server started");