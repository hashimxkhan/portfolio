document.addEventListener("DOMContentLoaded", () => {
    const dotContainer = document.createElement('div');
    dotContainer.className = 'dots';
    document.body.appendChild(dotContainer);

    const initialFixedDotCount = 150; // Number of initial fixed dots
    const initialMovingDotCount = 280; // Number of initial moving dots

    // Use viewport dimensions instead of document size
    const docWidth = window.innerWidth;
    const viewHeight = window.innerHeight;

    function createDot(isMoving) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (isMoving) {
            dot.classList.add('moving-dot');
            dot.style.animationDelay = `${Math.random() * 2}s`;
        }

        // Position the dot within viewport
        dot.style.left = `${Math.random() * docWidth}px`;
        dot.style.top = `${Math.random() * viewHeight}px`;

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

    // Update dimensions on window resize
    window.addEventListener('resize', () => {
        docWidth = window.innerWidth;
        viewHeight = window.innerHeight;
    });

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

// Scroll down to about for first button
const scrollDown = document.querySelector(".scroll-down")
const about = document.querySelector(".about")
scrollDown.addEventListener("click", function() {
    about.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

// scroll down to about from header
const aboutButton = document.querySelector(".about-button")
aboutButton.addEventListener("click", function() {
    about.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const containers = document.querySelectorAll('.sub-container');
    containers.forEach(container => {
        observer.observe(container);
    });
});

// Scroll down to expertise from about section
const scrollToExpertise = document.querySelector(".scroll-to-expertise");
const expertise = document.querySelector("#expertise");

scrollToExpertise.addEventListener("click", function() {
    expertise.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Scroll down to projects from expertise section
const scrollToProjects = document.querySelector(".scroll-to-projects");
const projects = document.querySelector("#projects");

scrollToProjects.addEventListener("click", function() {
    projects.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Scroll down to contact from projects section
const scrollToContact = document.querySelector(".scroll-to-contact");
const contact = document.querySelector("#contact");

scrollToContact.addEventListener("click", function() {
    contact.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// functionality for about button

// Header button scroll functionality
const headerButtons = document.querySelectorAll('.header button');
headerButtons.forEach(button => {
    button.addEventListener('click', function() {
        const text = this.textContent.toLowerCase();
        switch(text) {
            case 'expertise':
                expertise.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            case 'projects':
                projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            case 'contact':
                contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            // About button is already handled
        }
    });
});