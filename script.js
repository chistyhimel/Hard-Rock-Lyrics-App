const searchInput = document.getElementById("search-input");
const serarchButton = document.getElementById("search-btn");

const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const getLyricsBtn = document.getElementById("get-lyrics");
const searchResultContainer = document.querySelector(".search-result");
const lyricsContainer = document.querySelector(".single-lyrics");

const lyricsName = document.querySelector(".lyricsName");
const singerName = document.querySelector(".singerName");

serarchButton.addEventListener("click", getOutput);

searchInput.addEventListener("keypress",setQuery);

function setQuery(event){
  if(event.keyCode==13){
    getOutput();
  }
}

async function getOutput() {
  lyricsContainer.style.display = "none";
  searchResultContainer.style.display = "block";
  const response = await fetch(
    `https://api.lyrics.ovh/suggest/${searchInput.value}`
  );
  const data = await response.json();
  afterResponse(data);
}

function afterResponse(query) {
  searchResultContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const element = query.data[i];
    console.log(element);
    const getSong = element.title;
    const getArtist = element.artist.name;
    const songCover = element.album.cover_medium;
    console.log(songCover);

    const div = document.createElement("div");
    div.className = "single-result row align-items-center my-3 p-3";
    div.innerHTML = `<div class="col-md-9 d-flex align-items-center">
    <img
    src="${songCover}"
    alt="" style="height: 130px ;">

    <div>
      <h4 class="lyrics-name pl-2" id="song-name">${getSong}</h4>
      <p class="author lead pl-2">
        Song by <span id="artist-name">${getArtist}</span>
      </p>
    </div>
  </div>

  <div class="col-md-3 text-md-right text-center">
    <button class="btn btn-success pt-2" id="get-lyrics" onclick="loadLyrics('${getArtist}','${getSong}')">
      Get Lyrics
    </button>
  </div>`;
    searchResultContainer.appendChild(div);
  }
}

async function loadLyrics(artist, song) {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);

  const data = await response.json();
  searchResultContainer.style.display = "none";

  lyricsContainer.style.display = "block";
  document.querySelector(".lyric").innerText = data.lyrics;

  lyricsName.innerText = song;
  singerName.innerText = artist;
}

const goBackBtn = document.querySelector(".go-back");
goBackBtn.addEventListener("click", function () {
  lyricsContainer.style.display = "none";
  searchResultContainer.style.display = "block"
});
console.log(lyricsName.innerText);
console.log(singerName.innerText);
