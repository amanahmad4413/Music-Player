const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
const total_duration = document.getElementById("duration");

const progress_div = document.getElementById("progress_div");


const songs = [
    {
        name: "Ek-Tarfa",
        title: "Ek-Tarfa",
        artist: "Darshan Raval",
    },

    {
        name: "Bhula-Dunga",
        title: "Bhula-Dunga",
        artist: "Darshan Raval",
    },

    {
        name: "Is-Qadar",
        title: "Is-Qadar",
        artist: "Darshan Raval",
    },

    {
        name: "Jannat-Ve",
        title: "Jannat-Ve",
        artist: "Darshan Raval",
    },

    {
        name: "Chogada-Tara",
        title: "Chogada-Tara",
        artist: "Darshan Raval",
    },
]

let isPlaying = false;

    

// for play function

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};



// for pause function

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", () => {
    if (isPlaying){
        pauseMusic();
    }else {
        playMusic();
    }
});

// Changing the Music Data

const loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `images/${songs.name}.jpg`;
}
// loadSong(songs[0]);

songIndex = 0;

const nextSong = () =>{
    songIndex = (songIndex +1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};


const prevSong = () =>{
    songIndex = (songIndex -1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// Progress Bar Updating

music.addEventListener("timeupdate", (Event) => {
//  console.log(Event);
    const {currentTime, duration} = Event.srcElement;
    console.log(currentTime);
    console.log(duration);
    
    let progress_time = (currentTime / duration) * 100;

    progress.style.width = `${progress_time}%`;

   
   
    // Music Duration Update

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    
    if(duration){

        total_duration.textContent = `${tot_duration}`;
    }


    // Current Duration Update
    

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
     

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;

    current_time.textContent = `${tot_currentTime}`;
});

// Progress Onclick Functinality
progress_div.addEventListener("click", (Event) => {
    console.log(Event);
    const{duration} = music;

    let move_progress = (Event.offsetX / Event.srcElement.clientWidth) * duration;
    // console.log(move_progress);

    music.currentTime = move_progress;
})


// Next Song Call 
music.addEventListener("ended", nextSong);
 

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);