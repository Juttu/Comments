const mongoose = require('mongoose')

const Schema1 = mongoose.Schema

const commentSchema1 = new Schema1({
    id: { type: String, required: true },
    password: { type: String, require: true },
    courses: [{
        type: String,
        required: false,
    }]
})

const User = mongoose.model('User', commentSchema1)

module.exports = User
