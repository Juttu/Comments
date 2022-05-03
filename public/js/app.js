
let socket = io()

var video_name = sessionStorage.getItem("video_name");
let vname = {

   
    video_name:video_name
}
console.log(vname)

let username = sessionStorage.getItem("id");
console.log(username,video_name,"IDIDIDIDIDIDIDIDIDID")


const textarea = document.querySelector('#textarea')
const submitBtn = document.querySelector('#submitBtn')
const commentBox = document.querySelector('.comment__box')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let comment = textarea.value
    if(!comment) {
        return
    }
    postComment(comment)
    closeForm()
})

function closeForm() {

    open=0
    document.getElementById("myForm").style.display = "none";
    
    }

function postComment(comment) {

    
    // Append to dom
    let data = {

        username: username,
        comment: comment,
        video_name:video_name
    }
    appendToDom(data)
    textarea.value = ''
    // Broadcast
    broadcastComment(data)
    // Sync with Mongo Db
    syncWithDb(data)

}

function delete1(data)
{
    console.log("Inside")
    console.log("DELETE",data)
    const element = document.getElementById(data);
    element.remove();
    let dcomment={
        id:data
    }
    console.log(element,dcomment,"Element")

    deletedb(dcomment)

}
// function deletedb(category){
   
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-type': 'text/plain', // or remove this headers section
//         },
//         bodydata: category
//     }
//      const response = fetch('/data', options);
//      console.log(category);
// }
    

function appendToDom(data,username) {
    console.log(data.username,"hiiiiiiiii")

    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    if(data.username=="Admin" || username=="Admin"){
        let markup = `
        <div style="border-radius: 20px;" id=${data._id} class="card border-light mb-3">  
           
            <div style="background-color:#efece7
            " class="card-body">
                <h6>${data.username} </h6>
                <a>${data.comment} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <small>${moment().format(" MMMM Do, h:mm a")}</small></a>
                <div class="btn" id="btn" type="button" onclick=delete1("${data._id}")>
                <a href="" >DELETE</a>
                <div class="hoverBtn">
                  <p class="hoverText">SURE?</p>
                </div>
             </div>
               
            </div>
        </div>
    `
    lTag.innerHTML = markup
    commentBox.prepend(lTag)
    }
    else{
        let markup = `
        <div style="border-radius: 20px;" id=${data._id} class="card border-light mb-3">  
           
            <div style="background-color:#efece7
            " class="card-body">
                <h6>Student</h6>
                <a>${data.comment} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <small>${moment().format(" MMMM Do, h:mm a")}</small></a>
                <div class="btn" id="btn" type="button" onclick=delete1("${data._id}")>
                <a href="" >DELETE</a>
                <div class="hoverBtn">
                  <p class="hoverText">SURE?</p>
                </div>
             </div>
               
            </div>
        </div>
    `
    lTag.innerHTML = markup

    commentBox.prepend(lTag)
    }
  
    
}



function broadcastComment(data) {
    // Socket
    socket.emit('comment', data)
}

socket.on('comment', (data) => {
    appendToDom(data)
})
let timerId = null
function debounce(func, timer) {
    if(timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
        func()
    }, timer)
}
let typingDiv = document.querySelector('.typing')
socket.on('typing', (data) => {
    typingDiv.innerText = `${data.username} is typing...`
    debounce(function() {
        typingDiv.innerText = ''
    }, 1000)
})

// Event listner on textarea
textarea.addEventListener('keyup', (e) => {
    socket.emit('typing', { username })
})

// Api calls 

function syncWithDb(data) {
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch('/api/comments', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log(result._id,"ID")
        })
}


function deletedb(data) {
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch('/deletecomment', { method: 'POST', body:JSON.stringify(data),headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log(result._id,"ID")
        })
}



function fetchComments () {

    var video_name = sessionStorage.getItem("video_name");
    let vname = {

    
        video_name:video_name
    }

    console.log("Fetchhh",vname)

    const headers = {
        'Content-Type': 'application/json'
    }

    fetch('/comments', { method: 'POST', body:JSON.stringify(vname),headers})
        .then(res => res.json())
        .then(result => {
            console.log(result,"RESS")
            result.forEach((comment) => {
                comment.time = comment.createdAt
                console.log(comment.username,username,comment.comment,"USRNAME")

               

                // console.log(comment,"Fetchhhh")
                // console.log(x)




                appendToDom(comment,username)
                var element=document.getElementById('btn')
                console.log(element)

                 if(comment.username!=username && username!="Admin")
                {
                                        document.getElementById('btn').hidden=true;
                    

                }

                
                


            })
        })
}



window.onload = fetchComments