var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var loginBtn = document.getElementById('loginBtn');
var loginForm = document.querySelector('form');

// Function to display error or success message
function displayMessage(input, message, isValid) {
    let messageDiv = input.nextElementSibling;

    if (!messageDiv || !messageDiv.classList.contains('validation-message')) {
        messageDiv = document.createElement('div');
        messageDiv.classList.add('validation-message', 'my-2');
        input.parentNode.insertBefore(messageDiv, input.nextSibling);
    }

    if (isValid) {
        messageDiv.textContent = ''; // Remove message for valid inputs
    } else {
        messageDiv.textContent = message;
        messageDiv.style.color = 'red';
    }
}

// Function to validate login credentials
function validateLogin() {
    let isValid = true;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail.value.trim() === '') {
        displayMessage(userEmail, 'Email is required', false);
        isValid = false;
    } else if (!emailRegex.test(userEmail.value)) {
        displayMessage(userEmail, 'Invalid email format', false);
        isValid = false;
    } else {
        displayMessage(userEmail, '', true);
    }

    // Validate password length
    if (userPassword.value.trim() === '') {
        displayMessage(userPassword, 'Password is required', false);
        isValid = false;
    } else {
        displayMessage(userPassword, '', true);
    }

    return isValid;
}

// Function to handle login
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    

    if (validateLogin()) {
        // Retrieve users from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email and password match a registered user
        const user = users.find(u => u.email === userEmail.value.trim() && u.password === userPassword.value.trim());

        if (user) {
            // Save the user's name in local storage
            localStorage.setItem('loggedInUser', user.name);

            // Display success message
            let successMessage = document.createElement('div');
            successMessage.textContent = 'Login successful! Redirecting...';
            successMessage.style.color = 'green';
            successMessage.style.textAlign = 'center';
            successMessage.classList.add('validation-message', 'my-3');
            loginForm.appendChild(successMessage);

            // Redirect to dashboard or home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'home.html'; // Replace with your desired URL
            },500);
        } else {
            // Display error message if login fails
            displayMessage(userEmail, 'Invalid email or password', false);
            displayMessage(userPassword, 'Invalid email or password', false);
        }
    }
}

// Add event listener for button click
loginBtn.addEventListener('click', loginUser);

// Remove error message on input change if valid
[userEmail, userPassword].forEach(input => {
    input.addEventListener('input', () => {
        validateLogin();
    });
});
