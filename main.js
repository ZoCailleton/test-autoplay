import './reset.css'
import './style.scss'

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
