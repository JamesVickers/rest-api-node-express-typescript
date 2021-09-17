import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const NAMESPACE = 'Sample controller';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((result) => {
            // 201 created
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
// An alternative to the above would be as follows:
// const createBook = async (req...
// const response = await Book.create({ title... })
// console.log(response)
// res.json({ status: 'ok' })

const getBook = (req: Request, res: Response, next: NextFunction) => {
    let { title, author } = req.body;

    Book.findOne({ title, author })
        .exec()
        .then((result) => {
            return res.status(200).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                books: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getBook, getAllBooks };
