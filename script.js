// Placeholder for the counter logic
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.querySelector('.counter-section');

    // Start date and time for the counter
    const startDate = new Date('2023-11-11T00:00:00Z'); // November 11, 2023 at midnight UTC

    function updateCounter() {
        const now = new Date();
        const timeDiff = now - startDate; // Difference in milliseconds

        if (timeDiff < 0) {
            counterElement.textContent = "Counter hasn't started yet.";
            return;
        }

        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        counterElement.textContent = `My love for you began... ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }

    // Update the counter immediately and then every second
    updateCounter();
    setInterval(updateCounter, 1000);

    // Get elements for animations
    const treeWrapper = document.querySelector('.tree-wrapper');
    const textSection = document.querySelector('.text-section');

    // Sequence the animations:
    // 1. Grow the tree
    // 2. After growing, fade in the text (tree stays put)

    // Grow animation duration is 3 seconds (from style.css)
    const growDuration = 3000; // in milliseconds
    const moveAndFadeDuration = 2000; // Not used for tree movement, but kept for timing

    // Trigger the grow animation
    setTimeout(() => {
        treeWrapper.style.animation = `growTreeWrapper ${growDuration / 1000}s forwards`;
    }, 100); // Small delay to ensure initial styles are applied

    // After grow animation, trigger text fade-in
    setTimeout(() => {
        treeWrapper.style.animation = `growTreeWrapper ${growDuration / 1000}s forwards`; // Keep only grow animation
        textSection.style.opacity = 1; // Trigger the CSS transition for fade-in

        // Start the typing effect after the text section fades in
        /*const paragraphText = "I've missed you deeply all this time.\nIf I could choose a safe place in this world, it would be right by your side — always.\nOn your special day, I wish you all the happiness, love, and beautiful moments life can offer.\nHappy Birthday, my love. You deserve the very best, today and every day.";
        const typingElement = document.getElementById('typing-text');*/

        // Use a slight delay after the fade-in starts before typing begins
        const typingDelay = 500; // Adjust delay as needed
        const typingSpeed = 50; // Adjust speed in milliseconds per character

        setTimeout(() => {
            typeText(paragraphText, typingElement, typingSpeed);
        }, growDuration + 150 + typingDelay); // Start typing after tree growth and text fade-in delay

    }, growDuration + 150); // Trigger after grow animation finishes + a small delay

    // Add floating hearts animation after the tree grows
    const floatDelay = growDuration + 500; // Start floating shortly after tree finishes growing
    const numberOfFloatingHearts = 50; // Adjust number as needed

    setTimeout(() => {
        const hearts = document.querySelectorAll('.heart');
        // Filter hearts to float (e.g., select from the top part of the tree)
        const heartsToFloat = Array.from(hearts).filter(heart => {
            const topPosition = parseFloat(heart.style.top);
            // Adjust this value based on the container height and heart shape positioning
            return topPosition < heartsContainer.offsetHeight / 2;
        }).sort(() => 0.5 - Math.random()).slice(0, numberOfFloatingHearts);


        heartsToFloat.forEach(heart => {
            // Calculate random end position and rotation
            const endX = (Math.random() - 0.5) * 400; // Random horizontal movement
            const endY = -(Math.random() * 300 + 100); // Random upward movement
            const endRotation = (Math.random() - 0.5) * 720; // Random rotation

            // Apply animation using Web Animations API
            heart.animate([
                { transform: 'translate(0, 0) rotate(-45deg) scale(var(--heart-size, 10px) / 10)', opacity: 1 }, // Initial state
                { transform: `translate(${endX}px, ${endY}px) rotate(${endRotation}deg) scale(0.5)`, opacity: 0 } // End state
            ], {
                duration: Math.random() * 3000 + 4000, // Random duration between 4s and 7s
                easing: 'linear', // Use linear for continuous movement
                fill: 'forwards',
                iterations: Infinity // Make the animation loop indefinitely
            });

             // Optional: Remove heart from DOM after animation
            // heart.addEventListener('finish', () => {
            //      heart.remove();
            // });
        });

    }, floatDelay);

});

// Function to simulate typing effect
function typeText(text, element, speed) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');

    // Append cursor to the element initially.
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            // Handle newline characters
            if (text.charAt(i) === '\n') {
                const br = document.createElement('br');
                element.insertBefore(br, cursor); // Insert <br> before the cursor
                i++; // Skip the newline character
            } else {
                const charNode = document.createTextNode(text.charAt(i));
                element.insertBefore(charNode, cursor); // Insert text node before the cursor
                i++;
            }
            setTimeout(type, speed);
        } else {
            // Typing finished, cursor remains blinking due to CSS animation
            // No need to do anything here, CSS handles the blinking
        }
    }
    type();
}

// Generate hearts by scattering around heart shape outline
const numberOfHearts = 1000; // Number of hearts for filling
const heartsContainer = document.querySelector('.hearts-container');
const containerSize = heartsContainer.offsetWidth; // Assuming container is square

for (let i = 0; i < numberOfHearts; i++) {
     const angle = (i / numberOfHearts) * 2 * Math.PI; // Angle around the center

    // Parametric equations for a heart shape
    const x = 16 * Math.sin(angle) ** 3;
    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

    // Scale and translate to fit within the container (adjust as needed for desired size)
    const scaleFactor = containerSize / 40; // Adjusted scale factor for a smaller heart
    const offsetX = containerSize / 2; 
    const offsetY = containerSize / 4; // Adjusted vertical offset to move heart higher again

    // Calculate base position using parametric equations
    const baseX = x * scaleFactor + offsetX;
    const baseY = -y * scaleFactor + offsetY;

    // Randomize position more widely around the base point
    const randomRadius = Math.random() * scaleFactor * 1.8; // Increased random distance from the base point (adjust multiplier for density)
    const randomAngle = Math.random() * 2 * Math.PI; // Random angle around the base point

    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = `${baseX + randomRadius * Math.cos(randomAngle)}px`;
    heart.style.top = `${baseY + randomRadius * Math.sin(randomAngle)}px`;

     // Randomize heart size slightly
     const randomSize = 8 + Math.random() * 4; // Hearts between 8px and 12px
     heart.style.width = `${randomSize}px`;
     heart.style.height = `${randomSize}px`;
     heart.style.setProperty('--heart-size', `${randomSize}px`); // Use CSS variable for pseudo-elements

    heartsContainer.appendChild(heart);
} 

// Cap for floating hearts and particles
let floatingHeartCount = 0;
let particleCount = 0;
const MAX_FLOATING_HEARTS = 30;
const MAX_PARTICLES = 30;

// Patch for floating hearts (from index.html click event)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.interactive-element')) {
        if (floatingHeartCount >= MAX_FLOATING_HEARTS) return;
        floatingHeartCount++;
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
            floatingHeartCount--;
        }, 3000);
    }
});

// Patch for createParticles (from index.html)
function createParticles() {
    let toCreate = 30;
    for (let i = 0; i < toCreate; i++) {
        if (particleCount >= MAX_PARTICLES) break;
        particleCount++;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.fontSize = Math.random() * 15 + 15 + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.animationDuration = Math.random() * 4 + 3 + 's';
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
            particleCount--;
        }, 7000);
    }
}
window.createParticles = createParticles; // Make accessible from HTML

// Music optimization: Only play after user interaction (already handled by toggleMusic)
// Suggestion: Compress your MP3 file for better mobile performance. 

// Music player DOM elements (move to top)
const bgMusic = document.getElementById('bgMusic');
const songImage = document.getElementById('songImage');
const currentSongName = document.getElementById('currentSongName');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Volume control for music player
const volumeSlider = document.getElementById('volumeSlider');
const volumeHeart = document.getElementById('volumeHeart');
const volumeHeartIndicator = document.getElementById('volumeHeartIndicator');
if (volumeSlider && bgMusic) {
    function updateHeartColor(vol) {
        // Interpolate between light pink and deep pink
        // 0: #ffe4ec, 1: #FF69B4
        const minColor = [255, 228, 236]; // #ffe4ec
        const maxColor = [255, 105, 180]; // #FF69B4
        const r = Math.round(minColor[0] + (maxColor[0] - minColor[0]) * vol);
        const g = Math.round(minColor[1] + (maxColor[1] - minColor[1]) * vol);
        const b = Math.round(minColor[2] + (maxColor[2] - minColor[2]) * vol);
        if (volumeHeart) {
            volumeHeart.style.color = `rgb(${r},${g},${b})`;
        }
    }
    function updateHeartIndicator(vol) {
        // Slider width and thumb size
        const sliderWidth = volumeSlider.offsetWidth;
        const thumbSize = 28; // px, matches CSS
        // Calculate left position (center heart on thumb)
        const min = parseFloat(volumeSlider.min);
        const max = parseFloat(volumeSlider.max);
        const percent = (vol - min) / (max - min);
        const left = percent * (sliderWidth - thumbSize) + (thumbSize / 2) - 12; // 12px to center heart
        if (volumeHeartIndicator) {
            volumeHeartIndicator.style.left = `${left}px`;
        }
    }
    volumeSlider.addEventListener('input', function() {
        bgMusic.volume = parseFloat(this.value);
        updateHeartColor(this.value);
        updateHeartIndicator(this.value);
    });
    // Set initial volume and heart color
    bgMusic.volume = parseFloat(volumeSlider.value);
    updateHeartColor(volumeSlider.value);
    updateHeartIndicator(volumeSlider.value);
} 

// Playlist data
const playlist = [
    {
        name: 'Perfect',
        file: 'Ed Sheeran - Perfect.mp3',
        image: 'image.png',
    },
    {
        name: 'Just The Way You Are',
        file: 'Bruno Mars - Just The Way You Are (Lyrics).mp3',
        image: 'image copy.png', // Replace with another image if available
    },
    {
        name: 'It will rain',
        file: 'Bruno Mars - It Will Rain (Lyrics).mp3',
        image: 'image copy 2.png', // Replace with another image if available
    },
    {
        name: 'العشق صعيب',
        file: 'Cheba Manel ft Zakzouk  El 3achk S3ib _ العشق صعيب  Clip Officiel 2023.mp3',
        image: 'image copy 3.png', // Replace with another image if available
    },
];
let currentSongIndex = 0;

function loadSong(index) {
    const song = playlist[index];
    if (!song) return;
    // Update audio source
    bgMusic.src = song.file;
    // Update image and name
    songImage.src = song.image;
    currentSongName.textContent = song.name;
    // Reset play button icon
    playPauseBtn.querySelector('i').className = 'fas fa-play';
}

function playSong() {
    bgMusic.play();
    playPauseBtn.querySelector('i').className = 'fas fa-pause';
}

function pauseSong() {
    bgMusic.pause();
    playPauseBtn.querySelector('i').className = 'fas fa-play';
}

function togglePlayPause() {
    if (bgMusic.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
bgMusic.addEventListener('ended', playNext);

// Initial load
loadSong(currentSongIndex);

// --- Loading screen and gift button logic ---
window.addEventListener('load', function() {
    // Hide all elements initially
    const mainContent = document.querySelector('.container');
    const musicPlayer = document.querySelector('.music-player');
    const interactiveButtons = document.querySelector('.interactive-buttons');
    mainContent.style.opacity = '0';
    musicPlayer.style.opacity = '0';
    interactiveButtons.style.opacity = '0';
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const giftButton = document.getElementById('giftButton');
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            // Hide loading screen and show gift button
            loadingScreen.style.display = 'none';
            giftButton.style.display = 'flex';
            giftButton.classList.add('visible');
            // Fade in gift button
            setTimeout(() => {
                giftButton.style.opacity = '1';
            }, 100);
        }, 500);
    }, 1500);
});

window.openGift = function() {
    const giftButton = document.getElementById('giftButton');
    const mainContent = document.querySelector('.container');
    const musicPlayer = document.querySelector('.music-player');
    const interactiveButtons = document.querySelector('.interactive-buttons');
    // Fade out gift button
    giftButton.style.opacity = '0';
    giftButton.classList.remove('visible');
    // Fade in main content and controls
    mainContent.style.opacity = '1';
    musicPlayer.style.opacity = '1';
    interactiveButtons.style.opacity = '1';
    setTimeout(() => {
        giftButton.style.display = 'none';
    }, 500);
}

// --- Letter/message switching logic ---
const messages = [
    "I've missed you deeply all this time.\nIf I could choose a safe place in this world, it would be right by your side — always.\nOn your special day, I wish you all the happiness, love, and beautiful moments life can offer.\nHappy Birthday, my love. You deserve the very best, today and every day.",
    "Twa7chtek bzzzf w kanbghik bzzzzf w dima m3ak w aya 7aja khesatek atl9ayni m3ak \nHappy birthday bga3 naja7 w aya 7aja zwina w tkoni dima nti lwla w dima lfo9 \nYarbi tb9ay m3aya kola 3am w dima kanbghik w chokran 3la kola 7aja "
];
let showingAlt = false;
const changeMessageBtn = document.getElementById('changeMessageBtn');
const typingElement = document.getElementById('typing-text');

function showMessage(index) {
    typingElement.innerHTML = '';
    typeText(messages[index], typingElement, 50);
}

if (changeMessageBtn) {
    changeMessageBtn.addEventListener('click', function() {
        showingAlt = !showingAlt;
        showMessage(showingAlt ? 1 : 0);
    });
}
// On page load, show the first (basic) message
showMessage(0); 