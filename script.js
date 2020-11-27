var isShow = false;
var player;

window.addEventListener("load", function () {
  videojs("player");

  videojs("player").ready(function () {
    player = this;
    // this.play();

    this.on("timeupdate", function () {
      // console.log(this.currentTime());
      let t = this.currentTime();

      if (t >= 10 && t < 15) {
        if (isShow == false) {
          this.src("call_test.mp4");
          // console.log("change video");
          isShow = true;
        }
      }
    });

    let btn = document.getElementsByClassName("vjs-play-control")[0];
    btn.onclick = function () {
      let type = btn.getAttribute("title");
      if (type == "Replay") {
        player.load();
        fetchVideoAndPlay();
      }
    };
  });
});

function fetchVideoAndPlay() {
  fetch("./call_test.mp4")
    .then((response) => response.blob())
    .then((blob) => {
      video.srcObject = blob;
      return video.play();
    })
    .then((_) => {
      // Video playback started ;)
    })
    .catch((e) => {
      player.src("adventure.mp4");
      isShow = false;
      // Video playback failed ;(
    });
}
