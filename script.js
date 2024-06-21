/* document.addEventListener("DOMContentLoaded", () => {
    const dotContainer = document.createElement('div');
    dotContainer.className = 'dots';
    document.body.appendChild(dotContainer);

    const initialFixedDotCount = 50; // Number of initial fixed dots
    const initialMovingDotCount = 120; // Number of initial moving dots
    const newDotsInterval = 6000; // Interval to add new moving dots in milliseconds
    const newDotsCount = 10; // Number of new moving dots to add at each interval

    function createDot(isMoving) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (isMoving) {
            dot.classList.add('moving-dot');
            dot.style.animationDelay = `${Math.random() * 20}s`;
        }
        dot.style.left = `${Math.random() * 100}vw`;
        dot.style.top = `${Math.random() * 100}vh`;
        dotContainer.appendChild(dot);

        if (isMoving) {
            // Remove the dot when the animation ends
            dot.addEventListener('animationend', () => {
                dot.remove();
            });
        }
    }

    // Create initial fixed dots
    for (let i = 0; i < initialFixedDotCount; i++) {
        createDot(false);
    }

    // Create initial moving dots
    for (let i = 0; i < initialMovingDotCount; i++) {
        createDot(true);
    }

    // Add new moving dots at regular intervals
    setInterval(() => {
        for (let i = 0; i < newDotsCount; i++) {
            createDot(true);
        }
    }, newDotsInterval);
});
*/

document.addEventListener("DOMContentLoaded", () => {
    const dotContainer = document.createElement('div');
    dotContainer.className = 'dots';
    document.body.appendChild(dotContainer);

    const initialFixedDotCount = 60; // Number of initial fixed dots
    const initialMovingDotCount = 180; // Number of initial moving dots

    // Calculate the full document size
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;

    function createDot(isMoving) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (isMoving) {
            dot.classList.add('moving-dot');
            dot.style.animationDelay = `${Math.random() * 20}s`;
        }

        // Position the dot based on full document size
        dot.style.left = `${Math.random() * docWidth}px`;
        dot.style.top = `${Math.random() * docHeight}px`;

        dotContainer.appendChild(dot);

        if (isMoving) {
            // Remove the dot when the animation ends
            dot.addEventListener('animationend', () => {
                dot.remove();
            });
        }
    }

    // Create initial fixed dots
    for (let i = 0; i < initialFixedDotCount; i++) {
        createDot(false);
    }

    // Create initial moving dots
    for (let i = 0; i < initialMovingDotCount; i++) {
        createDot(true);
    }

    if (isMoving) {
        // Remove the dot when the animation ends
        dot.addEventListener('animationend', () => {
            dot.remove();
        });
    }

    setInterval(() => {
        for (let i = 0; i < 500; i++) {
            createDot(true);
        }
    }, 1);

});



document.addEventListener('DOMContentLoaded', function() {
    const words = ["Software ‎  Engineer", "FullStack Developer", "Computer Scientist"];
    let currentIndex = 0;
    const rotatingWordElement = document.querySelector(".intro");

    function typeWord(word, callback) {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            rotatingWordElement.textContent += word[charIndex];
            charIndex++;
            if (charIndex === word.length) {
                clearInterval(typeInterval);
                setTimeout(callback, 1500); // Pause before deleting
            }
        }, 30); // Typing speed
    }

    function deleteWord(callback) {
        let charIndex = rotatingWordElement.textContent.length;
        const deleteInterval = setInterval(() => {
            rotatingWordElement.textContent = rotatingWordElement.textContent.slice(0, -1);
            charIndex--;
            if (charIndex === 0) {
                clearInterval(deleteInterval);
                callback();
            }
        }, 25); // Deleting speed
    }

    function rotateWords() {
        deleteWord(() => {
            currentIndex = (currentIndex + 1) % words.length;
            typeWord(words[currentIndex], rotateWords);
        });
    }

    // Start the word rotation
    typeWord(words[currentIndex], rotateWords);
});