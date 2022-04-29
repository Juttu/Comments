const { response } = require('express')
const express = require('express')
const app = express()


const mongoose = require('mongoose');


const port = process.env.PORT || 3000
var bodyParser = require('body-parser');
app.use(express.static('public'))

// const dbConnect = require('./db')
// dbConnect()
const Comment = require('./models/comment')
const User = require('./models/user')


app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
  }));


  
mongoose.connect('mongodb+srv://Anurag:Anurag@cluster0.toske.mongodb.net/Videojs?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
try{
    console.log("Db Connected!")
    console.log("Db port up")
}
  catch(err){
    console.log(err)
}


// Routes 
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })

})

app.get('/api/comments', async(req, res) => {
    await Comment.find().then(function(comments) {
        res.send(comments)
    })
})

app.post('/check', async(req, res) => {

    console.log(req.body.id)
    
    let user = await User.findOne({id:req.body.id})
    if(user==null){
        res.send("0")
    }
    else{
        if(user.password == req.body.password)
        {
            console.log("PASSWORDDDDOKKKKKK")
            res.send("1")
        }
        else{
            res.send("0")
        }

    }


    console.log(user)
   

})


app.post('/deletecomment', async (request, repsonse) => {


    let text1 = "ObjectId";
    let text2 = "(";
    let text3 = '"'
    let text4=request.body.id
    let text5='"'
    let text6=")"
    let result = text1.concat(text2, text3,text4,text5,text6);

    // console.log(result)
    // const query = { _id: result };
    // var x = dbConnect.Comment.remove({"username":"Anurag"});
    // console.log(x)

    let comment_details= await Comment.deleteOne({"_id":text4})
    console.log(comment_details)

   })
   



const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    // Recieve event
    socket.on('comment', (data) => {
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) 
    })
})