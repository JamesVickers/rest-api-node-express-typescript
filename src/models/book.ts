import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/book';

const BookSchema: Schema = new Schema(
    {
        author: { type: String, required: true },
        title: { type: String, required: true },
        rating: { type: Number, required: true },
        extraInformation: { type: String }
    },
    {
        // automatically creates a createdAt and updatedAt timestamp and attaches it to the document
        timestamps: true
        // // can set custom collection name
        // collection: 'Custom-Books'
    }
);

// /* How to modify entry after save */
// // bind the save action to the post operation
// // means we can modify the data after it has been created using the create route
// // could be useful for updating an online store for example
// BookSchema.post<IBook>('save', function () {
//     this.extraInformation = 'This is dummy extra infomation that was added to the entry after the save';
// });

export default mongoose.model<IBook>('Book', BookSchema);
