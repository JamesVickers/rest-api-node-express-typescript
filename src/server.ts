import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRouter from './routes/sample';

const NAMESPACE = 'Server'; /* determines where logs are comming from */
const router = express();

/* Logging the request */
// middleware
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    // res.statusCode is the res that we return depending on the route the user picks
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    // pass the request through
    next();
});

/* Parse the requser - formally router.use(bodyParser.urlencoded... / bodyParser.json... */
// express.urlencoded: allows us to send nested json to the api
// express.json: means we don't have to call json.parse / json.stringify on the client side
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/* Rules for the API */
// middleware
router.use((req, res, next) => {
    // requests can come form anywhere
    // MUST RESTRICT THIS TO PRE-DEFINED IPS AND ROUTES WHEN IN PRODUCTION
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        // allow users of the api to see accepted methods for the API
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        // just returns a status code of 200 meaning the method was accepted
        return res.status(200).json({});
    }

    next();
});

/* Routes */
router.use('/sample', sampleRouter);

/* Error handling */
// middleware
// if API route not found
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/* Create the server*/
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
});
