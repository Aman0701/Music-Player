const songs = [{ id: 1, name: 'O Mahi', image: "image/o mahi.jpg", audio: 'songs/O Mahi O Mahi(PagalWorld.com.sb) (1).mp3', singer: "Arijit Singh", genre: "pop" },
{ id: 2, name: 'Believe', image: "image/believe.jpg", audio: "songs/Justin Bieber - Believe(PagalWorld.com.sb).mp3", singer: "Justin Bieber", genre: "hip-hop" },
{ id: 3, name: 'Pehle Bhi Main', image: "image/phlebhime.jpg", audio: "songs/Pehle Bhi Main(PagalWorld.com.sb).mp3", singer: "Vishal Mishra", genre: "rock" },
{ id: 4, name: 'Dancing In Stardust', image: "image/stardust dancing.jfif", audio: "songs/dancing-in-the-stardust-free-music-no-copyright-203603.mp3", singer: "Hoagy Carmichael", genre: "hip-hop" },
{ id: 5, name: 'Heeriye', image: "image/heeriye.jpg", audio: "songs/_Heeriye(PagalWorld.com.sb).mp3", singer: "Arijit Singh", genre: "pop" },
{ id: 6, name: 'Somebody Like You', image: "image/somebody-like-you.jpg", audio: "songs/Somebody Like U(PagalWorld.com.sb).mp3", singer: "Adele", genre: "rock" },
{ id: 7, name: 'Soulmate', image: "image/soulmate.jpg", audio: "songs/_Soulmate(PagalWorld.com.sb).mp3", singer: "Badshah", genre: "hip-hop" },
{ id: 8, name: 'Maan Meri Jaan', image: "image/maan-meri-jaan.jpg", audio: "songs/Maan Meri Jaan(PagalWorld.com.sb).mp3", singer: "King", genre: "pop" },
{ id: 9, name: 'Light The Sky', image: "image/light-the-sky.jpg", audio: "songs/Light The Sky(PagalWorld.com.sb).mp3", singer: "Manal", genre: "rock" },
{ id: 10, name: 'Raam Aayenge', image: "image/ram-aayenge.jpg", audio: "songs/Raam Aayenge(PagalWorld.com.sb).mp3", singer: "Swati Mishra", genre: "rock" },
{ id: 11, name: 'Ve Haniya', image: "image/ve Haaniyaan.jpg", audio: "songs/Ve Haniya(PagalWorld.com.sb) (1).mp3", singer: "Danny", genre: "hip-hop" },
{ id: 12, name: 'Let ME Love You', image: "image/let-me-love-you.jpg", audio: "songs/Let Me Love You(PagalWorld.com.sb).mp3", singer: "Mario", genre: "rock" },
{ id: 13, name: 'Yimmy Yimmy', image: "image/Yimmy Yimmy.jpg", audio: "songs/Yimmy Yimmy(PagalWorld.com.sb).mp3", singer: "Shreya Ghoshal", genre: "pop" },
{ id: 14, name: 'Bad Boys', image: "image/bad-boy.jpg", audio: "songs/Bad Boy(PagalWorld.com.sb).mp3", singer: "Inner Circle", genre: "rock" }
];



let forwardIndex = 1;
let songIndex = 1;
let playsequence = [songIndex];
let playIndex = 0;
let currGenre = document.getElementById("selectSong");
let songName = document.getElementById('song-name');
songs.forEach((song) => {
  const pTag = document.createElement('button');
  if (document.body.classList.contains('dark')) {
    pTag.classList.add("t-grey");
  } else {
    pTag.classList.add("dark-blue");
  }
  pTag.innerText = `${song.name}-${song.singer}`;
  songName.appendChild(pTag);
});

updateSong();

let selectedGenre;
currGenre.addEventListener("change", () => {
  selectedGenre = event.target.value.split(' ')[0];
  songName.innerHTML = "";
  if (selectedGenre === 'all') {
    songs.forEach((song) => {
      const pTag = document.createElement('button');
      if (document.body.classList.contains('dark')) {
        pTag.classList.add("t-grey");
      } else {
        pTag.classList.add("dark-blue");
      }
      pTag.innerText = `${song.name}-${song.singer}`;
      songName.appendChild(pTag);
    });
  } else {
    songs.forEach((song) => {
      if (song.genre === selectedGenre) {
        const pTag = document.createElement('button');
        if (document.body.classList.contains('dark')) {
          pTag.classList.add("t-grey");
        } else {
          pTag.classList.add("dark-blue");
        }
        pTag.innerText = `${song.name}-${song.singer}`;
        songName.appendChild(pTag);
      }
    });
  }
  updateSong();
});

function updatePlaySong(songSrc) {
  const audio = document.getElementById("audio");
  const image = document.getElementById("song-image");
  const detail = document.getElementById("song-detail");
  audio.src = songSrc.audio;
  image.src = songSrc.image;
  const name = document.createElement('h2');
  const singer = document.createElement('p');
  name.innerHTML = songSrc.name;
  singer.innerHTML = songSrc.singer;
  detail.innerHTML = "";
  detail.appendChild(name);
  detail.appendChild(singer);
  songIndex = songSrc.id - 1;
  audio.play();

}

function playSong() {
  let selectedbutton = event.target.innerText;
  let selectedSong = "";
  for (let i = 0; i < selectedbutton.length; i++) {
    if (selectedbutton[i] == '-') {
      break;
    } else {
      selectedSong = selectedSong + selectedbutton[i];
    }
  }

  const songSrc = songs.find(function (song) {
    if (song.name === selectedSong) {
      return song;
    }
  });
  playsequence.splice(playIndex + 1);
  playsequence.push(songSrc.id - 1);
  playIndex = playsequence.length - 1;
  document.getElementById("forward").classList.remove("dblue");
  document.getElementById("backward").classList.remove("dblue");
  updatePlaySong(songSrc);

}

function updateSong() {
  const div = document.getElementById('song-name');
  const buttons = div.querySelectorAll('button');
  buttons.forEach(button => {

    button.addEventListener("click", () => {
      if (selectedGenre == "all" || selectedGenre == undefined) {
        forwardIndex = 1;
      } else {
        forwardIndex = 3;
      }
    });
    button.addEventListener('click', playSong);
  });

}

function updateCurrentList() {
  const currplay = document.getElementById("current-playlist");

  let ind = currentplaylistsong[currentplaylistIndex];

  currplay.innerText = "";
  if (ind != undefined) {
    for (let i = 0; i < ind.length; i++) {
      const newSong = document.createElement('button');
      if (document.body.classList.contains('dark')) {
        newSong.classList.add("t-grey");
      } else {
        newSong.classList.add("dark-blue");
      }
      let songid = ind[i];
      newSong.innerText = `${songs[songid].name}-${songs[songid].singer}`;

      currplay.appendChild(newSong);
    }
  }




  const currsong = currplay.querySelectorAll('button');
  currsong.forEach((song) => {
    song.addEventListener('click', playSong);
    song.addEventListener("click", () => {
      forwardIndex = 2;
    })
  });
}

const playlist = [];
const currentplaylistsong = [];
let currentplaylistIndex = -1;
const allPlaylist = document.createElement('div');
allPlaylist.id = "all-playlist";
const h2 = document.createElement("h2");
h2.innerText = "All PlayList";
allPlaylist.appendChild(h2);
const songplayList = document.getElementById("song-playlist");
songplayList.appendChild(allPlaylist);
const createPlaylist = document.getElementById("create-playlist");
const playlistButton = createPlaylist.querySelector("button");
playlistButton.addEventListener("click", () => {
  const input = document.getElementById("input");
  const playListName = input.value;
  if (playListName == "") {
    alert("Please create a Playlist First!!");
  } else if(playlist.includes(playListName)){
    alert("playlist already added!!");
  }else{
    playlist.push(playListName);
    
    const button = document.createElement("button");
    if (document.body.classList.contains('dark')) {
      button.classList.add("t-grey");
    } else {
      button.classList.add("dark-blue");
    }
    button.innerText = playListName;
    allPlaylist.appendChild(button);
    button.addEventListener("click", () => {
      const index = playlist.indexOf(button.innerText);
      currentplaylistIndex = index;
      updateCurrentList();
    });
    alert(`${playListName} added to All PlayList`);
  }
  input.value = "";

});

const addToPlayList = document.getElementById("add");
addToPlayList.addEventListener('click', () => {
  if (currentplaylistIndex == -1) {
    alert("Please choose a playlist to add the song");
    return;
  } else if (currentplaylistsong[currentplaylistIndex] == undefined || currentplaylistsong[currentplaylistIndex] == null || currentplaylistsong[currentplaylistIndex].length == 0) {
    const newPlayList = [songIndex];
    currentplaylistsong[currentplaylistIndex] = newPlayList;
    alert(`${songs[songIndex].name} is Added To PlayList ${playlist[currentplaylistIndex]}`);
  } else {
    if (!currentplaylistsong[currentplaylistIndex].includes(songIndex)) {
      currentplaylistsong[currentplaylistIndex].push(songIndex);
      alert(`${songs[songIndex].name} is Added To PlayList ${playlist[currentplaylistIndex]}`);
    }
  }
  updateCurrentList();
});

const removeFromPlaylist = document.getElementById("remove");
removeFromPlaylist.addEventListener('click', () => {

  if (currentplaylistIndex == -1 || currentplaylistsong[currentplaylistIndex] == undefined || currentplaylistsong[currentplaylistIndex] == null || currentplaylistsong[currentplaylistIndex].length == 0) {
    alert("Please choose a playlist to remove the song")
    return;
  } else {
    let ind = -1;
    for (let i = 0; i < currentplaylistsong[currentplaylistIndex].length; i++) {
      if (currentplaylistsong[currentplaylistIndex][i] == songIndex) {
        ind = i;
      }
    }
    if (ind != -1) {
      currentplaylistsong[currentplaylistIndex].splice(ind, 1);
      alert(`${songs[songIndex].name} is Removed From PlayList ${playlist[currentplaylistIndex]}`);
    }else{
      alert(`Song ${songs[songIndex].name} Not Present In Playlist ${playlist[currentplaylistIndex]}`)
    }
  }
  updateCurrentList();
});


const forward = document.getElementById("forward");

forward.addEventListener('click', nextSong);

let audioplayer = document.getElementById("audio");
audioplayer.addEventListener("ended", nextSong);

function nextSong() {
  document.getElementById("backward").classList.remove("dblue");
  if (forwardIndex == 1) {
    songIndex++;
    if (songIndex == songs.length) {
      songIndex = 0;
    }
    playsequence.push(songs[songIndex].id - 1);
    playIndex = playsequence.length - 1;
  } else if (forwardIndex == 2) {
    let ind = -1;
    for (let i = 0; i < currentplaylistsong[currentplaylistIndex].length; i++) {
      if (currentplaylistsong[currentplaylistIndex][i] == songIndex) {
        ind = i;
        break;
      }
    }
    if (ind == -1 || ind == currentplaylistsong[currentplaylistIndex].length - 1) {
      ind = 0;
    } else {
      ind++;
    }
    songIndex = currentplaylistsong[currentplaylistIndex][ind];
    playsequence.push(songs[songIndex].id - 1);
    playIndex = playsequence.length - 1;
  } else if (forwardIndex == 3) {
    let ind = -1;
    for (let i = songIndex + 1; i < songs.length; i++) {
      if (songs[i].genre == selectedGenre) {

        ind = i;
        break;
      }
    }
    if (ind == -1) {
      for (let i = 0; i <= songIndex; i++) {
        if (songs[i].genre == selectedGenre) {
          ind = i;
          break;
        }
      }
    }
    songIndex = ind;
    playsequence.push(songs[songIndex].id - 1);
    playIndex = playsequence.length - 1;
  } else {
    ++playIndex;
    if (playIndex >= playsequence.length) {
      playIndex = playsequence.length - 1;
      return;
    } else if (playIndex == playsequence.length - 1) {
      document.getElementById("forward").classList.add("dblue");
      songIndex = playsequence[playIndex];
    } else {
      songIndex = playsequence[playIndex];
    }
  }
  updatePlaySong(songs[songIndex]);
}

const backward = document.getElementById("backward");
backward.addEventListener('click', previousSong);


function previousSong() {
  document.getElementById("forward").classList.remove("dblue");
  forwardIndex = 4;
  --playIndex;
  if (playIndex < 0) {
    playIndex = 0;
    return;
  } else if (playIndex == 0) {
    document.getElementById("backward").classList.add("dblue");
    songIndex = playsequence[playIndex];
  } else {
    songIndex = playsequence[playIndex];
  }

  updatePlaySong(songs[songIndex]);
}


let displaySong = document.getElementById("display-song");
const mainDiv = document.getElementById("main");
mainDiv.addEventListener("click", () => {
  displaySong.innerText = "";
})
function searchFunction() {
  displaySong.style.opacity = 1;
  displaySong.innerHTML = "";
  let searchItem = document.getElementById("searchSong").value.toLowerCase();
  if (document.getElementById("searchSong").value == "") {
    displaySong.innerHTML = "";
  } else {
    for (let i = 0; i < songs.length; i++) {
      let selectedSong = songs[i].name.toLowerCase();
      if (selectedSong) {

        if (selectedSong.indexOf(searchItem) > -1) {
          let songDisplay = document.createElement('p');
          songDisplay.innerText = `${songs[i].name}-${songs[i].singer}`;
          const newSpan = document.createElement("span");
          newSpan.innerText = "song"
          songDisplay.appendChild(newSpan);
          displaySong.appendChild(songDisplay);

        }

      }

    }
    for (let i = 0; i < playlist.length; i++) {
      let selectedPlaylist = playlist[i].toLowerCase();
      if (selectedPlaylist) {
        if (selectedPlaylist.indexOf(searchItem) > -1) {
          let playlistDisplay = document.createElement('p');
          playlistDisplay.innerText = playlist[i];
          displaySong.appendChild(playlistDisplay);
        }
      }
    }
  }

  const allSong = displaySong.querySelectorAll("*");
  allSong.forEach((song) => {
    song.addEventListener("click", search);
    song.addEventListener("click", () => {
      const input1 = document.getElementById("searchSong");
      input1.value = ""
    });
  });

}
function search() {
  let span = event.target.querySelector("span");
  if (span) {
    playSong();
  } else {
    const index1 = playlist.indexOf(event.target.innerText);
    currentplaylistIndex = index1;
    updateCurrentList();
  }
  displaySong.innerText = "";
  displaysearchsong.innerText = "";
  const input1 = document.getElementById("searchSong");
  input1.value = ""
}



const searchButton = document.getElementById("search-song");
searchButton.addEventListener("click", searchFunction);
searchButton.addEventListener("click", () => {
  const input1 = document.getElementById("searchSong");
  input1.value = ""
})


const checkbox = document.getElementById("checkbox");
const label = document.getElementById("checkbox-label");
const theme = document.createElement('span');
theme.innerText = "Dark";
label.appendChild(theme);
theme.style.color = "white";
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const songPlay = document.getElementById('song-play');
  songPlay.classList.toggle("blue");
  songPlay.classList.toggle("light-grey");
  const songlist = document.getElementById('song-list');
  songlist.classList.toggle("blue");
  songlist.classList.toggle("light-grey");
  const songplayList = document.getElementById('song-playlist');
  songplayList.classList.toggle("blue");
  songplayList.classList.toggle("light-grey");
  const songinfo = document.getElementById('song-info');
  songinfo.classList.toggle("dark-blue");
  songinfo.classList.toggle("t-grey");
  const inputTag = document.getElementById('input');
  inputTag.classList.toggle("dark");
  inputTag.classList.toggle("grey");
  const selectTag = document.getElementById('selectSong');
  selectTag.classList.toggle("pblue");
  selectTag.classList.toggle("tblue");
  if (document.body.classList.contains('dark')) {
    theme.innerText = "Light";
    label.appendChild(theme);
  } else {
    theme.innerText = "Dark";
    label.appendChild(theme);
  }
  const div = document.getElementById('song-name');
  const buttons = div.querySelectorAll('button');
  buttons.forEach(button => {
    console.log(button);
    button.classList.toggle("dark-blue");
    button.classList.toggle("t-grey");
  });
  const currplay = document.getElementById("current-playlist");
  const pTag = currplay.querySelectorAll('button');
  pTag.forEach(button => {
    button.classList.toggle("dark-blue");
    button.classList.toggle("t-grey");
  });
  const allplay = document.getElementById("all-playlist");
  const divTag = allplay.querySelectorAll('button');
  divTag.forEach(button => {
    button.classList.toggle("dark-blue");
    button.classList.toggle("t-grey");
  });

  label.classList.toggle("p-grey");
  label.classList.toggle("s-blue");

  const searchTag = document.getElementById('searchSong');
  searchTag.classList.toggle("dark");
  searchTag.classList.toggle("grey");
});

