import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import logging from '../config/logging';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const NAMESPACE = 'Authentication';

/* Take the token and check it is valid */
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    // split the array by the space and use the second part
    // a 'Bearer token' is passed in which is the word 'Bearer' followed by a space, but we want what is after that
    let token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
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
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractJWT;
