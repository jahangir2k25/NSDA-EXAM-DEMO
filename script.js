// Navbar: add 'navbar-scrolled' after scrolling down
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
    else navbar.classList.remove('navbar-scrolled');
});
// Toggler open state for icon animation
const navMenu = document.getElementById('navMenu');
const toggler = document.querySelector('.navbar-toggler');
if (navMenu) {
    navMenu.addEventListener('show.bs.collapse', () => toggler.classList.add('open'));
    navMenu.addEventListener('hide.bs.collapse', () => toggler.classList.remove('open'));
}


// contact form validation
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name");
        const address = document.getElementById("address");
        const email = document.getElementById("email");
        const number = document.getElementById("number");
        const message = document.getElementById("message");
        const submitBtn = form.querySelector('button[type="submit"]');

        let isValid = true;

        clearErrors();

        if (!name || name.value.trim() === "") {
            showError(name, "Name is required");
            isValid = false;
        }

        if (!address || address.value.trim() === "") {
            showError(address, "Address is required");
            isValid = false;
        }

        if (!email || email.value.trim() === "") {
            showError(email, "Email is required");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, "Email is not valid");
            isValid = false;
        }

        if (!number || String(number.value).trim() === "") {
            showError(number, "Phone number is required");
            isValid = false;
        } else if (String(number.value).replace(/\D/g, '').length < 6) {
            showError(number, "Enter a valid phone number");
            isValid = false;
        }

        if (!message || message.value.trim() === "") {
            showError(message, "Message is required");
            isValid = false;
        }

        if (isValid) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            // Simulate sending to server
            setTimeout(() => {
                if (successMsg) successMsg.textContent = "Your message has been sent successfully!";
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Submit";
                }
            }, 800);
        }
    });
}

function showError(input, message) {
    if (!input) return;
    const err = input.nextElementSibling;
    if (err) err.textContent = message;
    input.classList.add('is-invalid');
}
function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll('.is-invalid').forEach(i => i.classList.remove('is-invalid'));
    if (successMsg) successMsg.textContent = "";
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// FAQ Accordion: toggle icon on show/hide
const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {
    question.addEventListener("click", () => {

        // close all answers
        questions.forEach(q => {
            if (q !== question) {
                q.classList.remove("active");
                q.nextElementSibling.style.maxHeight = null;
                q.nextElementSibling.classList.remove("open");
            }
        });

        question.classList.toggle("active");
        const answer = question.nextElementSibling;

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.classList.remove("open");
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            answer.classList.add("open");
        }
    });
});

// If URL contains a hash like #faq or #qN, open/scroll accordingly
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash === '#faq') {
        const section = document.querySelector('.faq-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const qMatch = hash.match(/^#q(\d+)$/);
    if (qMatch) {
        const idx = parseInt(qMatch[1], 10);
        const q = document.getElementById('q' + idx);
        if (q) {
            // open it
            q.click();
            setTimeout(() => {
                q.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
});

