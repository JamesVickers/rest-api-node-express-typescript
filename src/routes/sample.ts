import express, { Router } from 'express';
import controller from '../controllers/sample';

const router = express.Router();

/* 
    @usage: test url
    @url: http://localhost:1337/sample/ping
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.get('/ping', controller.sampleHealthCheck);

export = router;
