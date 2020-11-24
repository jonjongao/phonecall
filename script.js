var isShow = false;

window.addEventListener("load", function () {
  //videojs(document.querySelector('.video-js'));
  videojs("player", {
    controls: true,
    autoplay: true,
    preload: "auto",
    width: 214,
    height: 330,
    poster: "adventure_thumbnail.jpg",
  });

  videojs("player").ready(function () {
    // this.play();
    
    this.on('timeupdate',function(){
      console.log(this.currentTime());
      let t=this.currentTime();

      if(t >= 10)
      {
        if(isShow==false)
        {
          this.src("call_test.mp4");
          console.log("change video");
          isShow=true;
        }
      }
    });
  });

  
});
