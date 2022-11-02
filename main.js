import './reset.css'
import './style.scss'

const cardObsCallback = (entries, observer) => { 
  entries.forEach(entry => {

    let iframe = entry.target.querySelector('iframe');

    if (entry.isIntersecting) {
      if (document.querySelector('article.card')) {
        document.querySelector('article.card').classList.remove('active')
      }
      entry.target.classList.add('active')
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      iframe.contentWindow.postMessage('play', '*');
    }
    else {
      entry.target.classList.remove('active')
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      iframe.contentWindow.postMessage('pause', '*');
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
