const { response } = require('express')
const express = require('express')
const app = express()


const mongoose = require('mongoose');


const port = process.env.PORT || 4000
var bodyParser = require('body-parser');
app.use(express.static('public'))

// const dbConnect = require('./db')
// dbConnect()
const Comment = require('./models/comment')
const User = require('./models/user')
const Emote = require('./models/emote')
const Course = require('./models/course')


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
        comment: req.body.comment,
        video_name:req.body.video_name
    })

    comment.save().then(response => {
        res.send(response)
    })

})

app.post('/comments', async(req, res) => {

    console.log(req.body.video_name)



    await Comment.find({video_name:req.body.video_name}).then(function(comments) {
        console.log(comments)
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


   app.post('/saveemote', async (request, response) => {

    let user = await Emote.findOne({
        username: request.body.username,
        video_name:request.body.video_name
    });
    console.log(user,request.body.likes,"USERRRr")
    var num=request.body.emote_number
    console.log(user)
    if (!user) {
        user = new Emote({
            username: request.body.username,
            video_name:request.body.video_name,
            likes: [],
            smile: [],
            doubt: [],
            sad: []
        });
        

    }
    if(num==1){
        user.likes.push(request.body.likes);
        await user.save();
        console.log("111111111")

    }
    else if(num==2){
        user.smile.push(request.body.likes);
        await user.save();
        console.log("2222222222")

    }
    else if(num==3){
        user.doubt.push(request.body.likes);
        await user.save();
        console.log("3333333333")

    }
    else{
        user.sad.push(request.body.likes);
        await user.save();
        console.log("4444444444")
    }

    

    response.send("juttu")
   
    

       


   })

   app.post('/fetchemote', async (req, res) => {


    console.log(req.body,"1sttt")
    emote = await Emote.find({video_name:req.body.video_name}).select('likes smile doubt sad').then(function(emote) {
        // console.log(emote,"2nddd")
        return emote
    })

    console.log(emote,"Emoottee")
    var likes_array=[]
    var a=0
    await emote.forEach(element => {

        console.log(element.likes)



        likes_array.push(element.likes,element.smile,element.doubt,element.sad)

        
    });
    console.log(likes_array,"la")
    var likes_array_int=[]
    if(likes_array.length!=0){
        await likes_array[0].forEach(element_1=>{

            likes_array[0][a]=parseInt(element_1)+1
            a=a+1
    
        })
        a=0
        await likes_array[1].forEach(element_2=>{
    
            likes_array[1][a]=parseInt(element_2)+1
            a=a+1
    
        })
        a=0
        await likes_array[2].forEach(element_3=>{
    
            likes_array[2][a]=parseInt(element_3)+1
            a=a+1
    
        })
        a=0
        await likes_array[3].forEach(element_4=>{
    
            likes_array[3][a]=parseInt(element_4)+1
            a=a+1
    
        })
        likes_array.length=likes_array.length-4
    
        console.log(likes_array,"INTTT")
    
        res.send(likes_array)
    }

    


    


    

       
    })

app.post('/course',async(req,res)=>{
    console.log(req.body,"Course")
    let user = await User.findOne({
        id: req.body.id,
        
    });

    const found = user.courses.find(element => element == req.body.course_name);
    if(!found){
        console.log("YESS")
        user.courses.push(req.body.course_name);
        await user.save();
    }



    

})

app.post('/course_list',async(req,response)=>{
    console.log(req.body,"Course_Listttt")
    let user = await User.findOne({
        id: req.body.id,
        
    });
    const us=user.courses
        var array1=[]


    var i=0
  
    var array2=[]
    console.log(us,"LISTOFCOURSES")
    us.forEach(async (e)=>{


                emote = await Course.find({course:e}).select('videos')
                // console.log(emote,"EMMMOOOTTWW")
                var xc= emote[0]["videos"].unshift(e)
                array1[i]= emote[0]["videos"]
                // array1[i]="hello"
        
                i=i+1
    
                // console.log(array1,"CNAMEEEE")
                if(i==us.length){
                    console.log("HIIIIIIIIII")
                    log(array1)
                }
                
                
            })
  
    function log(array1)
    {
        var finalarray=array1
        var farray=[]
        var ar_1=[]

        console.log(finalarray,"FINALARRAY")
        var k=0
        console.log(array1,"FINALLLLLLLLLL")
        array1.forEach(async (ar)=>{
            
            await ar.forEach(async (element1)=>{
                    var c= await count(element1)
                    console.log(k,"IIII1111")
                    
                    ar_1=ar_1.concat(c)
                    console.log(ar_1.length,"ARAR")
                    send(ar_1,array1,ar_1.length,array1.length)
                })

            k=k+1

        })

        console.log(ar_1,"AR!1111111")
        
        
    }
    function send(a,b,i,length){
        console.log(a,b,i,length,"ABABABAB")
        var result_final=[]
        result_final.push(b,a)
        i=i/4
        console.log(i,"FINALIIIIIIII")
        if(i==length){
            console.log(result_final,i,length,"FINALLLLLLRESULTT")
            rsend(result_final)
        }


    }
    function rsend(final){
        console.log(final,"FINALARRAY0000000")
        response.send(final)

    } 

    async function count(element1){
        var j=0
        await Comment.find({video_name:element1}).then(function(co) {
            co.forEach(async (e)=>{
                j=j+1
            })
    
            // console.log(co,"comments")
            // console.log(j)
           
        })
        return j
             
    }
    // var x=await Comment.find({video_name:"vid-10"})
    // console.log(x)
    
     
   
})


app.post('/append_course',async(req,res)=>{


    console.log(req.body,"Course_________11")
    emote = await Course.find({course:req.body.title}).select('videos')
    var array=emote[0]["videos"]
    array.unshift(req.body.title)
    console.log(array,"LOKOLOLO")
    console.log(array[1])
    var i=0;j=0;k=0
    await Comment.find({video_name:array[1]}).then(function(co) {
        co.forEach(async (e)=>{
            i=i+1
        })

        console.log(co,"comments")
        console.log(i)
       
    })
    await Comment.find({video_name:array[2]}).then(function(co) {
        co.forEach(async (e)=>{
            j=j+1
        })

        console.log(co,"comments")
        console.log(j)
       
    })
    await Comment.find({video_name:array[3]}).then(function(co) {
        co.forEach(async (e)=>{
            k=k+1
        })

        console.log(co,"comments")
        console.log(k)
       
    })
    var count=[]
    var final_array=[]
    count[0]=i;count[1]=j;count[2]=k
    final_array=final_array.concat(array,count)
    // console.log(final_array,"kljlakljlkdjlkjl")

    res.send(final_array)
    // console.log(emote,"jsdnfldjklsnkl")


    

    // const found = user.courses.find(element => element == req.body.course_name);
    // if(!found){
    //     console.log("YESS")
    //     user.courses.push(req.body.course_name);
    //     await user.save();
    // }

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