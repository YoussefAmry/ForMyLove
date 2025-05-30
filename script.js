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
        const paragraphText = "I've missed you deeply all this time.\nIf I could choose a safe place in this world, it would be right by your side — always.\nOn your special day, I wish you all the happiness, love, and beautiful moments life can offer.\nHappy Birthday, my love. You deserve the very best, today and every day.";
        const typingElement = document.getElementById('typing-text');

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