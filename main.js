import './reset.css'
import './style.scss'

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

    if(audioState) {

      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');

    } else {

      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute' }), '*');

    }
    
  }

}

toggleAudioElt.addEventListener('click', toggleAudio);

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

        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');

      }

      if(from === 'dailymotion') iframe.contentWindow.postMessage('play', '*');

    } else {

      entry.target.classList.remove('active')

      if(from === 'youtube') {
        
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');

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

window.addEventListener('DOMContentLoaded', function() {
  cardObserver();
});
