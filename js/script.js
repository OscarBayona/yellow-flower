const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });

document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.observe(element));

function releasePetals(amount = 8) {
  if (reducedMotion) return;
  const layer = document.querySelector('.petals');
  for (let index = 0; index < amount; index += 1) {
    const petal = document.createElement('i');
    petal.className = 'petal';
    petal.style.left = `${8 + Math.random() * 84}%`;
    petal.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
    petal.style.animationDuration = `${7 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 3}s`;
    layer.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }
}

releasePetals(7);
setInterval(() => releasePetals(3), 9000);

document.querySelectorAll('.sunflower__head').forEach((head) => {
  for (let index = 0; index < 14; index += 1) {
    const petal = document.createElement('i');
    petal.className = 'sunflower__petal';
    petal.style.transform = `rotate(${index * (360 / 14)}deg)`;
    head.prepend(petal);
  }
});

const lightLayer = document.querySelector('.night-lights');
for (let index = 0; index < 18; index += 1) {
  const light = document.createElement('i');
  light.className = 'firefly';
  light.style.left = `${5 + Math.random() * 90}%`;
  light.style.top = `${8 + Math.random() * 78}%`;
  light.style.setProperty('--duration', `${2.8 + Math.random() * 3.8}s`);
  light.style.setProperty('--delay', `${-Math.random() * 5}s`);
  lightLayer.appendChild(light);
}

const musicButton = document.querySelector('.music-button');
const song = document.querySelector('#song');

fetch('audio/song.mp3', { method: 'HEAD' })
  .then((response) => {
    if (response.ok) musicButton.hidden = false;
  })
  .catch(() => {});

musicButton.addEventListener('click', async () => {
  if (song.paused) {
    try {
      await song.play();
      musicButton.classList.add('is-playing');
      musicButton.setAttribute('aria-label', 'Pausar música');
      musicButton.querySelector('.music-button__label').textContent = 'Pausar';
    } catch (_) {
      musicButton.classList.remove('is-playing');
    }
  } else {
    song.pause();
    musicButton.classList.remove('is-playing');
    musicButton.setAttribute('aria-label', 'Reproducir música');
    musicButton.querySelector('.music-button__label').textContent = 'Música';
  }
});
