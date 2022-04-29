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

// var favoritemovie = "Shrek";
// sessionStorage.setItem("favoriteMovie", favoritemovie);