import fetch from 'node-fetch';

const API_PATH = 'http://localhost:8080';

class Server {
  static initializeStashNew = async (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    const result = await fetch(
      `${API_PATH}/initializeStash`,
    );

    const data = await result.json();

    res.end(JSON.stringify(data));
  };

  static initializeStashExpress = async () => {
    const result = await fetch(
      `${API_PATH}/initializeStash`,
    );

    return result.json();
  };

  static handleCors(req, res) {
    const { origin } = req.headers;

    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'];
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
}

export default Server;
