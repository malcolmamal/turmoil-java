import startServer from './src/app.js';
import Logger from './src/utils/logger.js';

const port = process.env.TURMOIL_BACKEND_PORT || 3030;

Logger.log("Starting server on port", port);

startServer(port);
