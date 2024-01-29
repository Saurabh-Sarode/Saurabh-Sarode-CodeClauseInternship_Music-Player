const music = document.querySelector('audio');
const play = document.getElementById('pause');


const naam = document.querySelector('.naam');
const gayak = document.querySelector('.gayak');
const img = document.querySelector('img');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const p_bar = document.querySelector('.p_bar');
const st_time = document.querySelector('#st_time');
const end_time = document.querySelector('#end_time');
const p_div = document.querySelector('.p_div');

const allsongs = [
    {
        song: "Jai-Shree-Ram.mp3",
        song_naam: "Jai Shree Ram",
        song_gayak: "Hansraj Raghuwanshi",
    },
    {
        song: "Ram-Siya-Ram.mp3",
        song_naam: "Ram-Siya-Ram",
        song_gayak: "Sachet Tondon",
    },
    {
        song: "Mahabali Maharudra.mp3",
        song_naam: "Mahabali Maharudra",
        song_gayak: "Vijay Prakash",
    },
    {
        song: "Mere Baba.mp3",
        song_naam: "Mere Baba",
        song_gayak: "Jubin Nautiyal",
    },
    {
        song: "Tum Prem Ho.mp3",
        song_naam: "Tum Prem Ho",
        song_gayak: "Mohit Lalvani",
    },
    {
        song: "Mere Paas Tum Raho.mp3",
        song_naam: "Mere Paas Tum Raho",
        song_gayak: "Mohit Lalvani",
    },


];

let isplaying = false;
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    play.title="pause";
}
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    play.title="play";
}

play.addEventListener('click', () => {
    isplaying ? pausemusic() : playmusic();
});



const loadsongs = (allsongs) => {
    naam.textContent = allsongs.song_naam;
    gayak.textContent = allsongs.song_gayak;
    music.src = allsongs.song;
};



var i = 0;

const nextsongs = () => {
    i = (i + 1) % allsongs.length;
    loadsongs(allsongs[i]);
    playmusic();
}

const prevsongs = () => {
    i--;
    if (i <= 0) {
        i = 4;
    }
    loadsongs(allsongs[i-1]);
    playmusic();
}

music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement; 

    let time = (currentTime / duration) * 100;
    p_bar.style.width = `${time}%`;
    if (p_bar.style.width == "100%") {
        nextsongs();
        p_bar.style.width = "0%";
    }


    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let end = `${min_duration}:${sec_duration}`;
    if (duration) {
        end_time.textContent = end;
    }

    let min_curtime = Math.floor(currentTime / 60)
    let sec_curtime = Math.floor(currentTime % 60);
    if (sec_curtime < 10) {
        sec_curtime = `0${sec_curtime}`
    }
    let strt = `${min_curtime}:${sec_curtime}`;
    st_time.textContent = strt;

});


p_div.addEventListener('click', (dba) => {
    const { duration } = music;

    let le_chalo = (dba.offsetX / dba.srcElement.clientWidth) * duration;

    music.currentTime = le_chalo;

});



next.addEventListener('click', nextsongs);
prev.addEventListener('click', prevsongs);



