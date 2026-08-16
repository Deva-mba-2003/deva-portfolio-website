"use strict";

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector(".contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");


/* =========================================
   FORM SUBMIT
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();


        // Validate form
        if (!validateName(name)) {
            showError(nameInput, "Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            showError(emailInput, "Please enter a valid email address.");
            return;
        }

        if (phone !== "" && !validatePhone(phone)) {
            showError(
                phoneInput,
                "Please enter a valid 10-digit phone number."
            );
            return;
        }

        if (message.length < 10) {
            showError(
                messageInput,
                "Message must contain at least 10 characters."
            );
            return;
        }


        // If everything is valid
        showSuccess();


        // Reset form
        contactForm.reset();

    });

}



/* =========================================
   NAME VALIDATION
========================================= */

function validateName(name) {

    const namePattern = /^[A-Za-z\s.]+$/;

    return (
        name.length >= 2 &&
        namePattern.test(name)
    );

}



/* =========================================
   EMAIL VALIDATION
========================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}



/* =========================================
   PHONE VALIDATION
========================================= */

function validatePhone(phone) {

    // Remove spaces, + and -
    const cleanPhone =
        phone.replace(/[\s\-+]/g, "");

    // Indian 10-digit phone number
    const phonePattern =
        /^[6-9]\d{9}$/;

    return phonePattern.test(cleanPhone);

}



/* =========================================
   SHOW ERROR
========================================= */

function showError(input, message) {

    // Remove previous error
    removeError(input);


    // Add error class
    input.classList.add("input-error");


    // Create error message
    const errorMessage =
        document.createElement("small");

    errorMessage.className = "error-message";

    errorMessage.textContent = message;


    // Add error after input
    input.parentElement.appendChild(errorMessage);


    // Focus input
    input.focus();

}



/* =========================================
   REMOVE ERROR
========================================= */

function removeError(input) {

    input.classList.remove("input-error");


    const oldError =
        input.parentElement.querySelector(".error-message");


    if (oldError) {
        oldError.remove();
    }

}



/* =========================================
   REMOVE ERROR WHILE TYPING
========================================= */

const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea"
);


formInputs.forEach(function (input) {

    input.addEventListener("input", function () {

        removeError(input);

    });

});



/* =========================================
   SUCCESS MESSAGE
========================================= */

function showSuccess() {

    // Remove previous success message
    const oldSuccess =
        contactForm.querySelector(".success-message");

    if (oldSuccess) {
        oldSuccess.remove();
    }


    // Create success message
    const successMessage =
        document.createElement("div");

    successMessage.className =
        "success-message";


    successMessage.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>
            Thank you! Your message has been submitted successfully.
        </span>
    `;


    // Add message at top of form
    contactForm.prepend(successMessage);


    // Automatically remove after 5 seconds
    setTimeout(function () {

        successMessage.remove();

    }, 5000);

}



/* =========================================
   SMOOTH SCROLL
========================================= */

const navigationLinks =
    document.querySelectorAll(
        '.nav-links a, .footer-links a, .logo'
    );


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");


        // Only handle internal links
        if (
            targetId &&
            targetId.startsWith("#")
        ) {

            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", function () {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .skill-box, .achievement-card, .timeline-content, .about-content"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});
