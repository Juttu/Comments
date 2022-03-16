function dbConnect() {
    // Db connection
const mongoose = require('mongoose')
const url = 'mongodb+srv://Anurag:Anurag@cluster0.toske.mongodb.net/IVideo?retryWrites=true&w=majority'

mongoose.connect(url, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const connection = mongoose.connection
connection.once('open', function() {
    console.log('Database connected...')
}).catch(function(err){
    console.log('Connection failed...')
})
}

module.exports = dbConnect