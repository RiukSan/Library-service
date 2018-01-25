var mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    type: String,
    address: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

var Library = mongoose.model('Library', librarySchema);

module.exports = Library;