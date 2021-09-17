import express, { Router } from 'express';
import controller from '../controllers/book';

const router: Router = express.Router();

/* 
    @usage: get single book
    @url: http://localhost:1337/books/get/book
    @method: GET
    @fields: title, author
    @access: PUBLIC
*/
router.get('/get/one', controller.getBook);

/* 
    @usage: get all books
    @url: http://localhost:1337/books/get/books
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.get('/get/all', controller.getAllBooks);

/* 
    @usage: create a book
    @url: http://localhost:1337/books/create/book
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.post('/create/book', controller.createBook);

export = router;
