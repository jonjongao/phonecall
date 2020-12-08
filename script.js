var isFirstContact = true;
var isShow = false;
var player;

window.addEventListener("load", function () {
  player = videojs("player", {}, function () {
    // let btn1 = document.getElementsByClassName("vjs-big-play-button")[0];
    // let btn2 = document.getElementsByClassName("vjs-play-control")[0];

    // player.on("click", function (e) {
    //   /**
    //    * ! 點擊影片任一處
    //    */
    //   // console.log(e);
    //   // console.log("click");
    // });

    player.on("play", checkFirstContact);

    /**
     * ! 鬼來電
     */
    player.on("timeupdate", function () {
      // console.log(this.currentTime());
      let t = this.currentTime();

      if (t >= 10 && t < 15) {
        if (isShow == false) {
          player.src({ type: "video/mp4", src: "call_test.mp4" });
          player.load();
          player.play();
          isShow = true;

          player.on("ended", onCallEnded);

          gtag("event", "video_call_in", {
            event_category: "影片操作",
            event_label: "鬼來電",
            non_interaction: true
          });
        }
      }
    });
  });
});

function checkFirstContact() {
  if (isFirstContact) {
    // console.log("play");
    gtag("event", "video_play", {
      event_category: "影片操作",
      event_label: "主動播放",
      non_interaction: true
    });
    isFirstContact = false;
    player.off("play", checkFirstContact);
  }
}

function onCallEnded() {
  // console.log("鬼來電結束");
  player.off("ended", onCallEnded);
  player.on("play", restartFromCall);
}

function restartFromCall() {
  player.off("play", restartFromCall);
  gtag("event", "video_replay", {
    event_category: "影片操作",
    event_label: "重播",
    non_interaction: true
  });
  // console.log("從鬼來電重新開始");
  player.load();
  fetchVideoAndPlay();
}

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
      player.src({ type: "video/mp4", src: "adventure.mp4" });
      player.load();
      player.play();
      isShow = false;
      // Video playback failed ;(
    });
}
