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
    // Initialize all section elements
    const about = document.querySelector(".about");
    const languages = document.querySelector("#languages");
    const projects = document.querySelector("#projects");
    const contact = document.querySelector("#contact");

    // First down arrow to About section
    const scrollDown = document.querySelector(".scroll-down");
    scrollDown.addEventListener("click", () => {
        about.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // About to Languages section
    const scrollToLanguages = document.querySelector(".scroll-to-languages");
    scrollToLanguages.addEventListener("click", () => {
        languages.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Languages to Projects section
    const scrollToProjects = document.querySelector(".scroll-to-projects");
    scrollToProjects.addEventListener("click", () => {
        projects.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Projects to Contact section
    const scrollToContact = document.querySelector(".scroll-to-contact");
    scrollToContact.addEventListener("click", () => {
        contact.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Header navigation buttons
    const headerButtons = document.querySelectorAll('.header button');
    headerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.toLowerCase();
            switch(text) {
                case 'about':
                    about.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                case 'languages':
                    languages.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                case 'projects':
                    projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                case 'contact':
                    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
            }
        });
    });

    // Intersection Observer for animations
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

// Scroll down to languages from about section
const scrollToLanguages = document.querySelector(".scroll-to-languages");
const languages = document.querySelector("#languages");

scrollToLanguages.addEventListener("click", function() {
    languages.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// scroll down to languages from header
const languagesButton = document.querySelector(".header button:nth-child(2)");
languagesButton.addEventListener("click", function() {
    languages.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});