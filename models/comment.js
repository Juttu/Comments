const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, require: true },
    video_name: { type: String, require: true },
    likes: [{
        type: Number,
        required: false,
    }],
    


}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment