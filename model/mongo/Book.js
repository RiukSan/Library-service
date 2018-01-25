var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issued: {
        type: Date
    }
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;