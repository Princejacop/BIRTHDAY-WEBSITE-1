
/* ── Cursor ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
});

// Lagged ring
(function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('button, a, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── Envelope open ── */
function openEnvelope() {
    const env      = document.getElementById('envelope');
    const envStage = document.getElementById('envelope-stage');
    const sitStage = document.getElementById('website-stage');
    const video    = document.getElementById('bg-video');

    env.classList.add('opening');

    setTimeout(() => {
    envStage.classList.add('fade-out');
    sitStage.classList.add('reveal');
    document.body.style.overflowX = 'hidden';
    if (video) video.play();
    }, 950);

    const music = document.getElementById('bg-music');
    if (music) music.play();
}

/* ── Navigation ── */
function goToProfile() {
    document.getElementById('profile-section').scrollIntoView({ behavior: 'smooth' });
}

function goBackToVideo() {
    document.getElementById('video-section').scrollIntoView({ behavior: 'smooth' });
}

function replay() {
    const envStage = document.getElementById('envelope-stage');
    const sitStage = document.getElementById('website-stage');
    const env      = document.getElementById('envelope');
    const video    = document.getElementById('bg-video');

    sitStage.scrollTo({ top: 0, behavior: 'smooth' });
    sitStage.classList.remove('reveal');

    setTimeout(() => {
    envStage.classList.remove('fade-out');
    env.classList.remove('opening');
    if (video) { video.pause(); video.currentTime = 0; }
    }, 700);

    const music = document.getElementById('bg-music');
    if (music) { 
        music.pause(); music.currentTime = 0;
    }
}
