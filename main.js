let videoElement = document.querySelector("#video-player");
let videoTitle = document.querySelector(".video-title");
let videoDescription = document.querySelector(".video-description");
let progress = document.querySelector(".progress");
let currentTimeE = document.querySelector("#current-time");
let durationE = document.querySelector("#duration");
let prviousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let playBtn = document.querySelector("#play");
let icon = playBtn.querySelector("i");
let volumeSlider = document.querySelector("#volume-range");
let playBackSpeed = document.querySelector("#speed-select");


// data modeling //

let videosContainer = [

    {
        src : "https://assets.mixkit.co/active_storage/video_items/100223/1721860447/100223-video-720.mp4",
        title : "Going down a curved highway through a mountain range",
        description:"Point of view going down a curved highway on a mountain road surrounded by trees and grass and other mountains in the distance"
    },

    {
        src : "https://assets.mixkit.co/videos/3428/3428-720.mp4",
        title : "Street with people walking at dusk",
        description:"Street with old buildings, with many people walking from one side to the other, signs and cars passing nearby, as it gets dark."
    },
    {
        src : "https://assets.mixkit.co/active_storage/video_items/100195/1721338072/100195-video-720.mp4",
        title : "Waterfall",
        description:"A serene waterfall cascades over a rocky cliff into a tranquil, brownish-tinged pool."
    },
]


// define state to track the changes //

let state = {
    currentIndex : 0,
    isPlaying : false,
    playBackSpeed : 1,
}


// funtion that loads and display just video and its properties // like, video, title, description.

let controlIconsState = () =>{
    icon.classList.toggle("fa-play", !state.isPlaying);
    icon.classList.toggle("fa-pause", state.isPlaying);
}
const loadVideo = (video) => {
    videoElement.src = video.src;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    videoElement.playbackRate = state.playBackSpeed;
    controlIconsState();
}

loadVideo(videosContainer[state.currentIndex]);


// controls Function // || play, next, previous //

const playVideo = () => {
    state.isPlaying = true;
    controlIconsState();
    videoElement.play();
    videoElement.volume = 0.1;
}
const stopVideo = () => {
    state.isPlaying = false;
    controlIconsState();
    videoElement.pause();
}

const nextVideo = () => {
    videoElement.pause();
    setTimeout(() => {
        state.currentIndex = (state.currentIndex + 1) % videosContainer.length;
        loadVideo(videosContainer[state.currentIndex]);
        playVideo();
    }, 1500);
}

const previousVideo = () => {
    videoElement.pause();
    setTimeout(() => {
        state.currentIndex = (state.currentIndex - 1 + videosContainer.length) % videosContainer.length;
        loadVideo(videosContainer[state.currentIndex]);
        playVideo();
    }, 1500);
}


const trackVideoProgress = (src) => {
    let {currentTime, duration} = src;
    if(!duration) return;

    let progressPercent = (currentTime / duration) * progress.max;
    progress.value = progressPercent;

    // set currentTime, and duration //
    // duration //
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    durationE.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    // currentTime 
    let currentMinutes = Math.floor(currentTime / 60); 
    let currentSeconds = Math.floor(currentTime % 60);
    currentTimeE.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
}

// event Listeners //

playBtn.addEventListener("click", (e) => {
     if(state.isPlaying){
        stopVideo();
     }else{
        playVideo();
     }
});


videoElement.addEventListener("timeupdate", (e) => {
     trackVideoProgress(e.target);
});


progress.addEventListener("input", (e) => {
    e.preventDefault();
    let updatedProgress = (e.target.value / e.target.max) * videoElement.duration;
    videoElement.currentTime = updatedProgress;
    console.log(updatedProgress);
    
})


prviousBtn.addEventListener("click", previousVideo);
nextBtn.addEventListener("click", nextVideo);

volumeSlider.addEventListener("change", (e) => {
    let volumeValue = e.target.value;
    videoElement.volume = volumeValue;
})


playBackSpeed.addEventListener("change", (e) => {
    let speedTrack = e.target.value;
    state.playBackSpeed = speedTrack;
    videoElement.playbackRate = state.playBackSpeed
})

  document.body.querySelector("#expand").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen();
      } else {
          document.exitFullscreen();
      }
  })
