import './reset.css'
import './style.scss'

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let iframeIds = [];

const iframes = document.querySelectorAll(".card .ytb-iframe");
iframes.forEach(function(iframe) {
	iframeIds.push(iframe.id);
});

window.onYouTubeIframeAPIReady = function() {
  iframeIds.forEach(function(iframeId) {
		let player = new YT.Player(iframeId, {
			events: {
				onReady: onPlayerReady
			}
		});
	});
}

let iframeObjects = [];

function onPlayerReady(event) {
	let iframeObject = event.target;
	iframeObjects.push(iframeObject);
  console.log(iframeObjects);
}

const cardObsCallback = (entries, observer) => {

  entries.forEach(entry => {

    let iframe = entry.target.querySelector('iframe');
    let from = iframe.dataset.from;

    if (entry.isIntersecting) {

      if (document.querySelector('article.card')) {
        document.querySelector('article.card').classList.remove('active')
      }

      entry.target.classList.add('active');

      if(from === 'youtube') {

        //iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');

      }

      if(from === 'dailymotion') iframe.contentWindow.postMessage('play', '*');

    } else {

      entry.target.classList.remove('active')

      if(from === 'youtube') {
        
        //iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');

      }

      if(from === 'dailymotion') iframe.contentWindow.postMessage('pause', '*');

    }
  });

}

const cardObserver = () => {
	const observer = new IntersectionObserver(cardObsCallback, {threshold: 0.8})
	const arr = document.querySelectorAll('article.card')
	arr.forEach((v) => {
		observer.observe(v);
	})
}

let audioState = false;

const toggleAudioElt = document.querySelector('.toggle-audio');

const toggleAudio = () => {

  audioState = !audioState;

  if(audioState) {

    toggleAudioElt.querySelector('img').src = './assets/audio.svg';

  } else {

    toggleAudioElt.querySelector('img').src = './assets/mute.svg'
    
  }

  for(let iframe of document.querySelectorAll('iframe')) {

    let from = iframe.dataset.from;

    if(audioState) {

      if(from === 'youtube') iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
      if(from === 'dailymotion') iframe.contentWindow.postMessage('unMute', '*');

    } else {

      if(from === 'youtube') iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute' }), '*');
      if(from === 'dailymotion') iframe.contentWindow.postMessage('mute', '*');

    }
    
  }

}

toggleAudioElt.addEventListener('click', toggleAudio);

window.addEventListener('DOMContentLoaded', function() {
  cardObserver();
});
