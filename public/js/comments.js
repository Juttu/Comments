
 document.getElementById("myButton").onclick = function () {


     id=document.getElementById("fname").value
     password=document.getElementById("lname").value
    // console.log(id,"Its ID")

    // console.log(password,"Its Password")



    let data_login = {
        id: id,
        password: password
    }
    console.log(data_login,"Its a password")

   check(data_login)




    // location.href = "comments.html";
};




function check(data) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    fetch('/check', { method: 'POST', body:JSON.stringify(data),headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result=="1"){
                    location.href = "playlist.html";
                }
                else{
                    location.href = "index.html";

                }
            
        })
}
// const headers = {
//     'Content-Type': 'application/json'
// }
// fetch('/api/comments', { method: 'Post', body:  JSON.stringify(data), headers})
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         console.log(result._id,"ID")
//     })