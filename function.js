// cursor/mouse pointer effect
const dotsCount = 12; // more dots more longer trail
const dots = [];
const mouse = { x: 0, y: 0 };

for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    
    const size = (dotsCount - i) * 1; 
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = (dotsCount - i) / dotsCount;

    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
}

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    let x = mouse.x;
    let y = mouse.y;

    dots.forEach((dot, index) => {
        // every dot will follow its ahead dot
        dot.x += (x - dot.x) * 0.3; // 0.3 for smoothness 
        dot.y += (y - dot.y) * 0.3;

        dot.el.style.left = `${dot.x}px`;
        dot.el.style.top = `${dot.y}px`;

        x = dot.x;
        y = dot.y;
    });

    requestAnimationFrame(animate);
}

// dots hover effect on any buttons or iamge
const hoverTargets = document.querySelectorAll('p, button, h1, img, .nav-section2 p');

hoverTargets.forEach(target => {
    target.addEventListener("mouseenter", () => {
        dots.forEach(dot => dot.el.classList.add("is-white"));
    });
    
    target.addEventListener("mouseleave", () => {
        dots.forEach(dot => dot.el.classList.remove("is-white"));
    });
});

animate();






// function for name-text letter falling effect
const nameText = document.querySelector('.name-text');

if (nameText) {
    const letters = nameText.textContent.split('');
    nameText.textContent = ''; 

    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        
        span.style.animationDelay = `${index * 0.1}s`; 
        
        nameText.appendChild(span);
    });
}






// function for role-text letter typing effect
const roleElement = document.querySelector('.role-text');
const roles = ["SOFTWARE DEVELOPER", "MERN STACK INTERN", "ANDROID DEVELOPER"];
let roleIndex = 0;
let charIndex = 0;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    roleElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex > currentRole.length) {
        // wait 2 seconds to show the full roole
        setTimeout(() => {
            roleElement.textContent = ""; 
            charIndex = 0;
            roleIndex = (roleIndex + 1) % roles.length; 
            typeEffect(); 
        }, 1000); // next role typing time start
    } else {
        setTimeout(typeEffect, 80); // typing speed
    }
}

document.addEventListener('DOMContentLoaded', typeEffect);






// Image effect following cursor
const heroImage = document.querySelector('.hero-section2 img');
const heroSection = document.querySelector('.hero-section');

heroSection.addEventListener('mousemove', (e) => {
    // Mouse ki position section ke andar nikaalo
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth) - 0.5;
    const yPos = (clientY / innerHeight) - 0.5;

    const moveX = xPos * 100; 
    const moveY = yPos * 100;
    const rotateX = yPos * -50; // Up/Down tilt
    const rotateY = xPos * 50;  // Left/Right tilt

    heroImage.style.transform = `
        translateX(${moveX}px) 
        translateY(${moveY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
    `;
});

// when mouse cursor is outside section image will fit to its original position
heroSection.addEventListener('mouseleave', () => {
    heroImage.style.transform = `translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`;
});






// about animation
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Jab section screen mein aaye (scroll down)
            entry.target.classList.add('active');
        } else {
            // Jab section screen se bahar jaye (scroll up)
            // Isse animation reset ho jayega aur dubara aane pe phir se play hoga
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.15 // 15% section dikhte hi shuru ho jayega
});

// About section ko observe karo
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    revealOnScroll.observe(aboutSection);
}




