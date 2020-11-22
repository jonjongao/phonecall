window.addEventListener("load", function () {
  //videojs(document.querySelector('.video-js'));
  videojs("player", {
    controls: true,
    autoplay: true,
    preload: "auto",
    width: 214,
    height: 330,
    poster: "call_test_thumbnail.jpg",
  });

  videojs("player").ready(function () {
    // this.play();
  });
});
