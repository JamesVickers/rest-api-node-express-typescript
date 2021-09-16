import express, { Router } from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router: Router = express.Router();

/* 
    @usage: A protected route for testing, to make sure the token we assign is working and the user is authenticated
    @url: http://localhost:1337/users/validate
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.get('/validate', extractJWT, controller.validateToken);

/* 
    @usage: Creating a new user and storing them in the DB
    @url: http://localhost:1337/users/register
    @method: POST
    @fields: no fields
    @access: PUBLIC
*/
router.post('/register', controller.register);

/* 
    @usage: Login the user and return the token and the user object
    @url: http://localhost:1337/users/login
    @method: POST
    @fields: no fields
    @access: PUBLIC
*/
router.post('/login', controller.login);

/* 
    @usage: Return all users in the DB without passwords
    @url: http://localhost:1337/users/get/all
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.get('/get/all', controller.getAllUsers);

export = router;
