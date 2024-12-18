document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const logoutButton = document.getElementById('logout');

    // Retrieve the logged-in user's name from local storage
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        usernameElement.textContent = `Welcome ${loggedInUser}`;
    }
    else {
        // Redirect to login page if no user is logged in
        // window.location.href = 'index.html';
        usernameElement.textContent = `Welcome you are not user yet`;
    }

    // Handle logout
    logoutButton.addEventListener('click', () => {
        // Clear local storage and redirect to login
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
});
