function openEnvelope() {

    const env = document.getElementById('envelope');
    const envStage = document.getElementById('envelope-stage');
    const siteStage = document.getElementById('website-stage');
    const video = document.getElementById('bg-video');

    env.classList.add('opening');

    setTimeout(() => {

        envStage.classList.add('fade-out');

        siteStage.classList.add('reveal');

        document.body.style.overflowX = 'hidden';

        if (video) {
            video.play();
        }

    }, 900);

}

function goToProfile() {

    const profileSection = document.getElementById('profile-section');

    profileSection.scrollIntoView({
        behavior: 'smooth'
    });

}

function goBackToVideo() {

    const videoSection = document.getElementById('video-section');

    videoSection.scrollIntoView({
        behavior: 'smooth'
    });

}

function replay() {

    const envStage = document.getElementById('envelope-stage');
    const siteStage = document.getElementById('website-stage');
    const env = document.getElementById('envelope');
    const websiteStage = document.getElementById('website-stage');
    const video = document.getElementById('bg-video');

    // Scroll back to top
    websiteStage.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Hide website
    siteStage.classList.remove('reveal');

    setTimeout(() => {

        // Show envelope again
        envStage.classList.remove('fade-out');

        // Reset animation
        env.classList.remove('opening');

        // Restart video
        if (video) {

            video.pause();

            video.currentTime = 0;

        }

    }, 700);

}