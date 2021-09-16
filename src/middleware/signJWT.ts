import config from '../config/config';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user';

const NAMESPACE = 'Authentication';

/* 
When a user logs in we will call this function, which will sign the token and return it to them.
They can then use it try to access out protected routes
*/
const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    // time in seconds since epoch 1970...
    const timeSinceEpoch = new Date().getTime();
    // time in confic is time in minutes
    // multiply by 100000 to get the time in milliseconds
    const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempting to sign the token for ${user.username}`);

    try {
        // first arg is the payload, where you can pass in any vital information. e.g. user, user role, admin?
        // second arg is the secret
        // third arg is the options
        // fourth arg is a callback
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(NAMESPACE, 'Unable to sign token', error);
    }
};

export default signJWT;
