/* Watch face customizer functionality */
const watchScreen = document.getElementById('watch-screen');
const selectorBtns = document.querySelectorAll('.selector-btn');
const dialFaces = document.querySelectorAll('.dial-face');

selectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        selectorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        dialFaces.forEach(face => face.classList.remove('active'));
        document.getElementById(`dial-${target}`).classList.add('active');
        
        watchScreen.setAttribute('data-face', target);
    });
});

/* Animated clock hands for classic watch face */
function updateClockHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    
    if (hourHand && minuteHand && secondHand) {
        const hourDegrees = (hours * 30) + (minutes * 0.5);
        const minuteDegrees = (minutes * 6) + (seconds * 0.1);
        const secondDegrees = seconds * 6;
        
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }

    // Dynamically update classic date text
    const dateEl = document.querySelector('.classic-date');
    if (dateEl) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayName = days[now.getDay()];
        const dayDate = String(now.getDate()).padStart(2, '0');
        dateEl.textContent = `${dayName} ${dayDate}`;
    }
}

setInterval(updateClockHands, 1000);
updateClockHands();

/* Pre-order form functionality */
const preorderForm = document.getElementById('preorder-form');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const preorderSuccess = document.getElementById('preorder-success');
const preorderFormContainer = document.getElementById('preorder-form-container');
const successEmailText = document.getElementById('success-email-text');
const resetFormBtn = document.getElementById('btn-reset-form');

preorderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    
    if (!validateForm(name, email)) {
        return;
    }
    
    const submitBtn = document.getElementById('btn-submit-preorder');
    if (submitBtn) {
        submitBtn.classList.add('submitting');
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        if (submitBtn) {
            submitBtn.classList.remove('submitting');
            submitBtn.disabled = false;
        }
        showSuccessCard(email);
    }, 1200);
});

function validateForm(name, email) {
    let isValid = true;
    
    const nameGroup = userNameInput.closest('.form-group');
    const emailGroup = userEmailInput.closest('.form-group');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name.length < 2) {
        if (nameGroup) nameGroup.classList.add('has-error');
        isValid = false;
    } else {
        if (nameGroup) nameGroup.classList.remove('has-error');
    }
    
    if (!emailRegex.test(email)) {
        if (emailGroup) emailGroup.classList.add('has-error');
        isValid = false;
    } else {
        if (emailGroup) emailGroup.classList.remove('has-error');
    }
    
    return isValid;
}

userNameInput.addEventListener('input', () => {
    if (userNameInput.value.trim().length >= 2) {
        const nameGroup = userNameInput.closest('.form-group');
        if (nameGroup) nameGroup.classList.remove('has-error');
    }
});

userEmailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(userEmailInput.value.trim())) {
        const emailGroup = userEmailInput.closest('.form-group');
        if (emailGroup) emailGroup.classList.remove('has-error');
    }
});

function showSuccessCard(email) {
    preorderFormContainer.style.display = 'none';
    preorderSuccess.style.display = 'block';
    successEmailText.textContent = email;
}

resetFormBtn.addEventListener('click', () => {
    preorderForm.reset();
    
    const nameGroup = userNameInput.closest('.form-group');
    const emailGroup = userEmailInput.closest('.form-group');
    if (nameGroup) nameGroup.classList.remove('has-error');
    if (emailGroup) emailGroup.classList.remove('has-error');
    
    preorderFormContainer.style.display = 'block';
    preorderSuccess.style.display = 'none';
    userNameInput.focus();
});

/* Navbar scroll effect */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* Mobile menu toggle */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when any link (including Order button) is clicked
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* Scroll spy to highlight active nav link */
const sections = document.querySelectorAll('section[id]');
const navMenuItems = document.querySelectorAll('.nav-menu .nav-link');

function scrollSpy() {
    const scrollPosition = window.scrollY + 120; // Offset for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navMenuItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', scrollSpy);
window.addEventListener('load', scrollSpy);
