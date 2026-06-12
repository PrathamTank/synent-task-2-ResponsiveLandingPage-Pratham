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
    
    showSuccessCard(email);
});

function validateForm(name, email) {
    let isValid = true;
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    
    if (name.length < 2) {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }
    
    if (!email.includes('@') || email.length < 5) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    return isValid;
}

function showSuccessCard(email) {
    preorderFormContainer.style.display = 'none';
    preorderSuccess.style.display = 'block';
    successEmailText.textContent = email;
}

resetFormBtn.addEventListener('click', () => {
    preorderForm.reset();
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

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

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
