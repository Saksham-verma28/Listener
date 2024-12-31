let songIndex = 0;
let audioElement = new Audio('Ego-killer.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { SongName: "Lunch - Billie Eilish", filePath: "Lunch.mpeg", coverPath: "https://th.bing.com/th/id/OIP.JcJv8E7jPAAH7-MyrBAD-QAAAA?rs=1&pid=ImgDetMain" },
    { SongName: "11k - Seedhe Maut", filePath: "11k.mpeg", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/97/00/d4/9700d4a5-393c-2441-60af-ba2d923a38e3/8445162961745.jpg/1200x1200bf-60.jpg" },
    { SongName: "Billie jeans - Micheal Jackson", filePath: "03 Billie Jean.mp3", coverPath: "https://img.discogs.com/ksAhJW8KO8Pc7pTdjaaCUiIpG1s=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1467525-1221934260.jpeg.jpg" },
    { SongName: "Criminal - Britney Spears", filePath: "Criminal.mp3", coverPath: "https://th.bing.com/th/id/OIP.YNkT1uDcmB7QMLc0wJD_wwHaHa?rs=1&pid=ImgDetMain" },
    { SongName: "Beanie - Chezile", filePath: "Beanie-Chezile.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b273c16d7b73bd1445e941588b73" },
    { SongName: "Nanchaku - Seedhe Maut", filePath: "Seedhe Maut - Nanchaku ft. MC STAN.mp3", coverPath: "https://images.genius.com/1fd49e9b888d41e63555b304ecd9d777.1000x1000x1.png" },
    { SongName: "Jimmy Jimmy Aaja - Parvati Khan", filePath: "Jimmi Jimmi Jimmi Aaja.mp3", coverPath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/ab/55/fb/ab55fbed-9006-5a7c-8001-6201ffda93a4/191773223045.jpg/1200x1200bf-60.jpg" },
    { SongName: "Ego Killer - Dhanda Niyoliwala", filePath: "Ego-killer.mp3", coverPath: "https://www.lyricsbogie.com/wp-content/uploads/2024/05/ego-killer-lyrics-758x426.jpg" },
    { SongName: "MUNDE HOOD DE - Raftar", filePath: "Munde-hood-de.mp3", coverPath: "https://i.ytimg.com/vi_webp/EnLSD4urgKU/0.webp" },
    { SongName: "Shakti aur Kshama - Seedhe Maut", filePath: "Shakti Aur Kshama.mp3", coverPath: "https://images.genius.com/a6662e8accc80d7403b42b8cd3bb1328.1000x1000x1.png" }
];

// Play/Pause functionality for the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update progress bar during playback
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Initialize song items
songItems.forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[index].SongName;
});

// Helper function to reset play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Individual song play functionality
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    });
});

// Forward button functionality (Next Song)
document.querySelector('.backward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    updateUI();
});

// Backward button functionality (Previous Song)
document.querySelector('.forward').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUI();
});

// Update UI function
const updateUI = () => {
    document.querySelector('.songInfo').innerHTML = `
        <img src="${songs[songIndex].coverPath}" width="42px" alt="" id="gif"> ${songs[songIndex].SongName}`;
    makeAllPlays();
    let songItemPlay = document.getElementsByClassName('songItemPlay')[songIndex];
    songItemPlay.classList.remove('fa-play-circle');
    songItemPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};
