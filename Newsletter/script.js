document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const emailErrorMessage = emailInput.nextElementSibling;
    const nameErrorMessage = nameInput.nextElementSibling;

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const showError = (element, message) => {
        element.textContent = message;
        element.style.display = 'block';
        element.previousElementSibling.classList.add('invalid');
    };

    const hideError = (element) => {
        element.style.display = 'none';
        element.previousElementSibling.classList.remove('invalid');
    };

    const showPopup = (message) => {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <p>${message}</p>
            <button class="close-btn">Close</button>
        `;
        document.body.appendChild(popup);

        const closeButton = popup.querySelector('.close-btn');
        closeButton.addEventListener('click', () => {
            popup.remove();
        });
    };

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            hideError(emailErrorMessage);
        } else if (!validateEmail(emailInput.value)) {
            showError(emailErrorMessage, 'Please enter a valid email address');
        } else {
            hideError(emailErrorMessage);
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            showError(nameErrorMessage, 'Please enter your name');
        } else {
            hideError(nameErrorMessage);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            showError(emailErrorMessage, 'Please enter a valid email address');
            isValid = false;
        }

        if (nameInput.value.trim() === '') {
            showError(nameErrorMessage, 'Please enter your name');
            isValid = false;
        }

        if (isValid) {
            showPopup('Thank you for subscribing!');
            form.reset();
            hideError(emailErrorMessage);
            hideError(nameErrorMessage);
        }
    });
});