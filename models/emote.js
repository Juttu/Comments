const mongoose = require('mongoose')

const Schema = mongoose.Schema

const emoteSchema = new Schema({
    username: { type: String, required: true },
    
    video_name: { type: String, require: true },
    
    likes: [{
        type: Number,
        required: false,
    }],
    


}, { timestamps: true })

const Emote = mongoose.model('Emote', emoteSchema)

module.exports = Emote