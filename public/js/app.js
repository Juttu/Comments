let username 
let socket = io()
do {
    username = prompt('Enter your name: ')
} while(!username)

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
})

function postComment(comment) {

    
    // Append to dom
    let data = {
        username: username,
        comment: comment
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
        <div id=${data._id} class="card border-light mb-3">  
            <div>
                <button id="btn" type="button" onclick=delete1("${data._id}")>Delete</button>
            </div>
            <div class="card-body">
                <h6>${data.username}</h6>
                <p>${data.comment}</p>
                <div>
                    <img src="/img/clock.png" alt="clock">
                    <small>${moment(data.time).format('LT')}</small>
                </div>
            </div>
        </div>
    `
    lTag.innerHTML = markup
    commentBox.prepend(lTag)
    }
    else{
        let markup = `
        <div id=${data._id} class="card border-light mb-3">  
            <div>
                <button id="btn" type="button" data-id="${data.username}" onclick=delete1("${data._id}")>Delete</button>
            </div>
            <div class="card-body">
                <h6>Student</h6>
                <p>${data.comment}</p>
                <div>
                    <img src="/img/clock.png" alt="clock">
                    <small>${moment(data.time).format('LT')}</small>
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

    fetch('/api/comments')
        .then(res => res.json())
        .then(result => {
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