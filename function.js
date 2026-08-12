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


// navbar, menu bar functionality(opening/closing)
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".nav-bar-menu");
    const menuIcon = document.querySelector(".nav-bar-menu i");
    const navSection2 = document.querySelector(".nav-section2");
    const navContainer = document.querySelector("nav");

    const closeMenu = () => {
        if (navSection2.classList.contains("active")) {
            navSection2.classList.remove("active");
            menuIcon.classList.remove("bi-x");
            menuIcon.classList.add("bi-list");
        }
    };

    // Toggle Menu on Click
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation(); 
        
        navSection2.classList.toggle("active");

        if (navSection2.classList.contains("active")) {
            menuIcon.classList.remove("bi-list");
            menuIcon.classList.add("bi-x");
        } else {
            menuIcon.classList.remove("bi-x");
            menuIcon.classList.add("bi-list");
        }
    });

    // 1. FIX: close navbar on clicking outside navbar
    document.addEventListener("click", (event) => {
        if (!navContainer.contains(event.target)) {
            closeMenu();
        }
    });

    // 2. FIX: close navbar on scrolling outside
    window.addEventListener("scroll", () => {
        closeMenu();
    }, { passive: true }); 

    // 3. close menu bar on clicking links
    const navLinks = document.querySelectorAll(".nav-section2 a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
});




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
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.15 
});

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    revealOnScroll.observe(aboutSection);
}






// project section, and animation
const GITHUB_USERNAME = "Sreenu9133"; 

async function loadRepos() {
    const repoList = document.getElementById('repo-list');
    const repoCount = document.getElementById('repo-count');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        const repos = await response.json();

        repoCount.innerText = repos.length;
        repoList.innerHTML = "";

        repos.forEach(repo => {
            const repoHTML = `
                <div class="repo-item">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p style="color: #bbb; font-size: 14px; margin: 5px 0;">${repo.description || "No description available"}</p>
                    <div class="repo-details">
                        <span><i class="bi bi-circle-fill" style="color: #f2ff5b; font-size: 10px;"></i> ${repo.language || "Code"}</span>
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </div>
            `;
            repoList.innerHTML += repoHTML;
        });
    } catch (error) {
        repoList.innerHTML = "<p style='padding:20px; color:red;'>Failed to load repositories. Check your username.</p>";
    }
}

loadRepos();



//contact section animation
const observerOptions = {
    threshold: 0.2 
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        } else {
            entry.target.classList.remove('reveal');
        }
    });
}, observerOptions);

const contactSection = document.querySelector('.contact-section');
contactObserver.observe(contactSection);





(function () {
    emailjs.init({
        publicKey: "rfaeHGLsJdHgnoQV7",
    });
})();


document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        // VERY IMPORTANT
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        emailjs.sendForm(
            "service_k1jmwkt",
            "template_wlwutyt",
            contactForm
        )
        .then(() => {

            formStatus.textContent =
                "Your message has been sent successfully.";

            formStatus.style.background = "#111";
            formStatus.classList.add("show");

            contactForm.reset();

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";

            setTimeout(() => {
                formStatus.classList.remove("show");
            }, 4000);

        })
        .catch((error) => {

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Unable to send your message. Please try again.";

            formStatus.style.background = "#b91c1c";
            formStatus.classList.add("show");

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";

            setTimeout(() => {
                formStatus.classList.remove("show");
            }, 4000);
        });
    });

});