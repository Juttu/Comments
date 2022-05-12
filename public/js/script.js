





let videoList1 = document.querySelectorAll('.video-list-container1 .list1');
let username = sessionStorage.getItem("id");


videoList1.forEach(vid =>{
   vid.onclick = () =>{

      let src = vid.querySelector('.list-video1').src;

      let title1 = vid.querySelector('.list-title1');
      let title=title1.textContent
      title=title.slice(0,-26);
      console.log(title,"HIIIIOJLJLJLJLJLKL")
      // document.querySelector('.main-video-container .main-video').src = src;
      // document.querySelector('.main-video-container .main-video').play();
      // document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
      // var favoritemovie = src;
      // sessionStorage.setItem("favoriteMovie", favoritemovie);
      open(title)

   };
});

function open(title){

    let data = {

        course_name: title,
        id:username
    }
    let data1={
        title:title
    }
    var x;


   x=append_course(data1)
   console.log(x,"TTTT")



    
   
  
   database(data)


}

function append_course(data){
    const headers = {
            'Content-Type': 'application/json'
        }
        fetch('/append_course', { method: 'Post', body:  JSON.stringify(data), headers})
            .then(response => response.json())
            .then(result => {
                console.log(result,"HELELELLLL")
                append(result)
            })
       
}

function database(data){
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch('/course', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result.body)
        })
}



function start()
{
    console.log("Start")
    let videoList = document.querySelectorAll('.video-list-container .list');
    console.log(videoList,"List")
    
    videoList.forEach(vid =>{
       vid.onclick = () =>{
          videoList.forEach(remove =>{remove.classList.remove('active')});
          vid.classList.add('active');
          let src = vid.querySelector('.list-video').src;
          let title = vid.querySelector('.list-title').innerHTML;
          // document.querySelector('.main-video-container .main-video').src = src;
          // document.querySelector('.main-video-container .main-video').play();
          // document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
          var favoritemovie = src;
          sessionStorage.setItem("favoriteMovie", favoritemovie);
          console.log(src,"SRRRCCCCC")
          location.href="comments.html"
          // check()
       };
    });
    
    
}

function append(title){
    console.log(title,"TITLEEE!!!!!")
    let markup = `
    <h3 class="list-title">${title[0]}</h3> 


    <div class="list">
       <video src="images/${title[1]}.mp4" class="list-video"></video>
       <h3 class="list-title">Lecture Video-1
            <span style="color:#6b6666;"><br>Total Comments : ${title[4]}</span>
        </h3>

    </div>

    <div class="list">
       <video src="images/${title[2]}.mp4" class="list-video"></video>
       <h3 class="list-title">Lecture Video-2
            <span style="color:#6b6666;"><br>Total Comments : ${title[5]}</span></h3>
    </div>

    <div class="list">
       <video src="images/${title[3]}.mp4" class="list-video"></video>
       <h3 class="list-title">Lecture Video-33
            <span style="color:#6b6666;"><br>Total Comments : ${title[6]}</span></h3>
    </div>
 `
 // lTag1.innerHTML = markup

 var s=document.getElementById("vid").insertAdjacentHTML("afterBegin",markup)
 start()

}


function fetchVideos(){
    let username = sessionStorage.getItem("id");
    console.log(username,"FETCHUSERNAME")
    let data = {

    
        id:username
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    fetch('/course_list', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
            var A= result.pop();
            console.log(A,"count")
            console.log(result,"courses")

            const numsPerGroup = Math.ceil(4);
            // Create array based on number of groups
            const result1 = new Array(A.length/4)
             // Make sure each element isn't empty
             .fill('')
            // For each group, grab the right `slice` of the input array
             .map((_, i) => A.slice(i * numsPerGroup, (i + 1) * numsPerGroup));
            // for(i=0;i<result.length;i++){
            //     for(j=0;j<4;j++){
            //         result[i].push(A[j]);
            //     } 
            // }
            // var count = A.splice(0,4)
            result1.forEach((el)=>{
                el.shift();
            })
            console.log(result1,"ressss")



            var arr=[]
            // console.log(count)
            for(i=0;i<result1.length;i++){
                arr[i] =result[0][i].concat(result1[i])
                 }
            
              //var arr =result[0][0].concat(result1[0])
              console.log(arr,"gggg")
              arr.forEach((course)=>{
                console.log(course,"FINAL_RESULT")
                append(course)
            })
        })



}

window.onload = fetchVideos

// var favoritemovie = "Shrek";
// sessionStorage.setItem("favoriteMovie", favoritemovie);