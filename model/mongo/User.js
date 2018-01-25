var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        surName: String
    },
    age: Number,
    sex: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;