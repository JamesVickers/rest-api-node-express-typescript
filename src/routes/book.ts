import express, { Router } from 'express';
import controller from '../controllers/book';

const router: Router = express.Router();

/* 
    @usage: get single book
    @url: http://localhost:1337/books/get/one
    @method: GET
    @fields: author, title
    @access: PUBLIC
*/
router.get('/get/one', controller.getBook);

/* 
    @usage: get all books
    @url: http://localhost:1337/books/get/all
    @method: GET
    @fields: no fields
    @access: PUBLIC
*/
router.get('/get/all', controller.getAllBooks);

/* 
    @usage: create a book
    @url: http://localhost:1337/books/create/book
    @method: POST
    @fields: author, title
    @access: PUBLIC
*/
router.post('/create/book', controller.createBook);

/* 
    @usage: update a book
    @url: http://localhost:1337/books/update/rating
    @method: PUT
    @fields: id, rating
    @access: PUBLIC
*/
router.put('/update/rating', controller.updateRating);

/* 
    @usage: delete a book
    @url: http://localhost:1337/books/delete/book
    @method: POST
    @fields: id
    @access: PUBLIC
*/
router.post('/delete/book', controller.deleteBook);

export = router;
