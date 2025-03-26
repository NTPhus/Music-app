// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics
      },
    ],
    autoplay: true,
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });

  ap.on("ended", function () {
    const link = `/songs/listen/${dataSong._id}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const elementListenSpan = document.querySelector(
          ".singer-detail .inner-listen span"
        );
        elementListenSpan.innerHTML = ` ${data.listen} lượt nghe`;
      });
  });
}
// End APlayer

//Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");

    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";

    const link = `/songs/like/${typeLike}/${idSong}`;

    const option = {
      method: "PATCH",
    };

    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = data.like + " thích";

          buttonLike.classList.toggle("active");
        }
      });
  });
}
//End Button like

//Button favourite
const listButtonFavourite = document.querySelectorAll("[button-favourite]");
if (listButtonFavourite.length > 0) {
  listButtonFavourite.forEach((buttonFavourite) => {
    buttonFavourite.addEventListener("click", () => {
      const idSong = buttonFavourite.getAttribute("button-favourite");

      const isActive = buttonFavourite.classList.contains("active");

      const typeFavourite = isActive ? "unfavourite" : "favourite";

      const link = `/songs/favourite/${typeFavourite}/${idSong}`;

      const option = {
        method: "PATCH",
      };

      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavourite.classList.toggle("active");
          }
        });
    });
  });
}
//End Button like

//Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;
    console.log(keyword);

    const link = `search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");

          const html = songs.map((song) => {
            return `
              <a href="songs/detail/${song.slug}" class="inner-item">
                <div class="inner-image"> 
                  <img src=${song.avatar}/>
                </div>
                <div class="inner-info">
                  <div class="inner-title"> ${song.title} </div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}  </div>
                 </div>
              </a>
            `;
          });

          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = html.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
//End Search Suggest
