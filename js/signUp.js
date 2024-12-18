var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var signUpBtn = document.getElementById('signUpBtn');
var form = document.querySelector('form');

var users;

if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
} else {
    users = [];
}

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

// Function to validate fields
function validateFields() {
    let isValid = true;

    // Validate username
    if (userName.value.trim() === '') {
        displayMessage(userName, 'Name is required', false);
        isValid = false;
    } else {
        displayMessage(userName, '', true);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailExists = users.some(user => user.email === userEmail.value.trim());
    if (userEmail.value.trim() === '') {
        displayMessage(userEmail, 'Email is required', false);
        isValid = false;
    } else if (!emailRegex.test(userEmail.value)) {
        displayMessage(userEmail, 'Invalid email format', false);
        isValid = false;
    }
    // Check if email already exists
    else if (isEmailExists) {
        // Display error message for duplicate email
        displayMessage(userEmail, 'This email is already registered', false);
        isValid = false;
    }
    else {
        displayMessage(userEmail, '', true);
    }

    // Validate password length
    if (userPassword.value.trim() === '') {
        displayMessage(userPassword, 'Password is required', false);
        isValid = false;
    } else if (userPassword.value.length < 6) {
        displayMessage(userPassword, 'Password must be at least 6 characters long', false);
        isValid = false;
    } else {
        displayMessage(userPassword, '', true);
    }

    return isValid;
}

// Function to add user if valid
function addUser(event) {
    event.preventDefault(); // Prevent form submission

    if (validateFields()) {
        // Add user to local storage
        var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Display success message
        let successMessage = document.createElement('div');
        successMessage.textContent = 'Sign-up successful! Redirecting to login...';
        successMessage.style.color = 'green';
        successMessage.style.textAlign = 'center';
        successMessage.classList.add('validation-message', 'my-3');
        form.appendChild(successMessage);

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}


// Add event listener for button click
signUpBtn.addEventListener('click', addUser);

// Remove error message on input change if valid
[userName, userEmail, userPassword].forEach(input => {
    input.addEventListener('input', () => {
        validateFields();
    });
});
