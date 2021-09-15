import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Authentication';

/* Take the token and check it is valid */
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    // split the array by the space and use the second part
    // a 'bearer token' is passed in which is the word 'bearer' followed by a space, but we want what is after that
    let token = req.headers.authorization?.split(' '[1]);

    if (token && token[0]) {
        jwt.verify(token[0], config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                // res.locals is a way to save variables and pass them along to the functions or middleware that are going to use the payload next
                res.locals.jwt = decoded;
                next();
            }
            return res.status(401).json({
                message: 'Unauthorized'
            });
        });
    }
};

export default extractJWT;
