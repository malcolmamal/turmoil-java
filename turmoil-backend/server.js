import fetch from 'node-fetch';

const API_PATH = 'http://localhost:8080';

export class Server {

  constructor(req, res) {
    //this.handleCors(req, res);
  }

  initializeStashOld = (req, res) => {
    const http = require('http');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.writeHead(200, {'Content-Type': 'text/plain'});

    console.log('before get');

    http.get(`${API_PATH}/initializeStash`, (resp) => {
      console.log('get start');
      let output = "";

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        output = chunk.toString();
      }).on('end', function () {
        res.end(output);
        console.log('on end');
      });

      console.log('get end');
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    console.log('after get');
  };

  initializeStashNew = async (req, res) => {

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.writeHead(200, {'Content-Type': 'text/plain'});

    const result = await fetch(
        `${API_PATH}/initializeStash`,
    );

    const data = await result.json();

    res.end(JSON.stringify(data));
  };

  initializeStashExpress = async () => {
    const result = await fetch(
        `${API_PATH}/initializeStash`,
    );

    return await result.json();
  };

  handleCors(req, res) {
    const {origin} = req.headers;

    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'];
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
}
