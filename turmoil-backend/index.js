//const http = require('http');
//const {Server} = require("./server.js");
//const {Server} = require("./server");

import {Server} from "./server.js";
import * as http from "http";

http.createServer((req, res) => {
    let server = new Server();
    server.initializeStashNew(req, res);
    console.log('something');
}).listen(3030);
