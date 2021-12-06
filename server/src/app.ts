import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from 'config';
import { version } from '../package.json'
import logger from './utils/logger';
import socket from './socket';

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express()
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    }
});

app.get('/', (request, response) => {
    response.send(`Server is up and running version ${version}`)
})


httpServer.listen(port, host, () => {
    logger.info(`Server version ${version} is listening`)
    logger.info(`http://${host}:${port}`)

    socket({ io })
})