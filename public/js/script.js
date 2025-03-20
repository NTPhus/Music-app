// APlayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
    let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
    let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
    const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: [
          {
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
          },
        ],
        autoplay: true
      });

      const avatar = document.querySelector(".singer-detail .inner-avatar");
      

      ap.on('play', function () {
        avatar.style.animationPlayState = "running";
      });

      ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
      });
}
// End APlayer
