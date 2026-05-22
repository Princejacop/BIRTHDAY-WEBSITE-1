/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

function bindCursorHover() {
  document.querySelectorAll('button, [onclick], .mc, .env-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
}
bindCursorHover();

/* ═══════════════════════════════════════
   ENVELOPE
═══════════════════════════════════════ */
function openEnvelope() {
  const envelope  = document.getElementById('envelope');
  const envStage  = document.getElementById('env-stage');
  const site      = document.getElementById('site');
  const video     = document.getElementById('bg-video');
  const music     = document.getElementById('bg-music');

  envelope.classList.add('open');

  setTimeout(() => {
    envStage.classList.add('out');
    site.classList.add('show');

    if (video) video.play();
    if (music) music.play();

    startObserver();
  }, 980);
}

/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
function nav(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function replay() {
  const envStage = document.getElementById('env-stage');
  const site     = document.getElementById('site');
  const envelope = document.getElementById('envelope');
  const video    = document.getElementById('bg-video');
  const music    = document.getElementById('bg-music');

  site.scrollTo({ top: 0, behavior: 'smooth' });
  site.classList.remove('show');

  setTimeout(() => {
    envStage.classList.remove('out');
    envelope.classList.remove('open');
    if (video) { video.pause(); video.currentTime = 0; }
    if (music) { music.pause(); music.currentTime = 0; }
  }, 700);
}

/* ═══════════════════════════════════════
   GALLERY SCROLL REVEAL
═══════════════════════════════════════ */
function startObserver() {
  const cells = document.querySelectorAll('.mc');
  const root  = document.getElementById('site');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { root, threshold: 0.1 });

  cells.forEach(c => obs.observe(c));
}

/* ═══════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════ */
function lb(cell, caption) {
  const box   = document.getElementById('lb');
  const img   = document.getElementById('lb-img');
  const ph    = document.getElementById('lb-ph');
  const label = document.getElementById('lb-label');

  const src = cell.querySelector('img');

  if (src && src.src && !src.src.endsWith('/')) {
    img.src            = src.src;
    img.style.display  = 'block';
    ph.style.display   = 'none';
  } else {
    img.style.display  = 'none';
    ph.style.display   = 'flex';
  }

  label.textContent = caption || '';
  box.classList.add('on');
}

function lbClose(e) {
  /* clicking the image itself should NOT close */
  if (e.target.id === 'lb-img') return;
  document.getElementById('lb').classList.remove('on');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('lb').classList.remove('on');
});

/*Toggle audio*/
function toggleMute() {
  const music = document.getElementById('bg-music');
  const btn   = document.getElementById('mute-btn');
  if (music.paused) {
    music.play();
    btn.textContent = '⏸ Music';
  } else {
    music.pause();
    btn.textContent = '▶ Music';
  }
}
