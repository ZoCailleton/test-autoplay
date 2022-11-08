import './reset.css'
import './style.scss'

const createYTScript = () => {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

const iframes = document.querySelectorAll(".card .ytb-iframe");
let iframeIds = [];

iframes.forEach(function(iframe) {
	iframeIds.push(iframe.id);
});

window.onYouTubeIframeAPIReady = function() {
  iframeIds.forEach(function(iframeId) {
		new YT.Player(iframeId, {
      playerVars: {
        autoplay: 1, controls: 0, modestbranding: true, showinfo: 0
      },
			events: {
				onReady: onPlayerReady
			}
		});
	});
}

let iframeObjects = [];
let iframeObjectsAndHTML = [];

function onPlayerReady(event) {

	let iframeObject = event.target;

  // Stack the ready iframe in a array
	iframeObjects.push(iframeObject);

  iframeObjects[0].playVideo();

  // Check if all iframes are ready
  if(iframeObjects.length === iframes.length) {
    // Activate the audio toggle button
    toggleAudioElt.addEventListener('click', toggleAudio);
    // Activate the card scroll observer
    cardObserver();
  }

}

const cardObsCallback = (entries) => {

  entries.forEach(entry => {

    let iframe = entry.target.querySelector('iframe');
    if(iframe != undefined) {
      console.log(iframe);
    }

    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
  
}

const cardObserver = () => {
	const observer = new IntersectionObserver(cardObsCallback, {threshold: 0.8});
	const arr = document.querySelectorAll('article.card');
	arr.forEach((v) => {
		observer.observe(v);
	})
}

let audioState = false;
const toggleAudioElt = document.querySelector('.toggle-audio');

const toggleAudio = () => {
  audioState = !audioState;
  toggleAudioElt.querySelector('img').src = audioState ? './assets/audio.svg' : './assets/mute.svg';
  for(let iframe of iframeObjects) {
    audioState ? iframe.unMute() : iframe.mute();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createYTScript();
});
