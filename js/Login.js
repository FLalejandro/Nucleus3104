// Registration Stuff
document.addEventListener("DOMContentLoaded", function() {

     updateLoginIcon();
    // Handle the registration form submission
    var registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way (this won't take people to other pages)

            // Gather form data
            var username = document.querySelector("input[name='regUsername']").value;
            var email = document.querySelector("input[name='regEmail']").value;
            var password = document.getElementById("regPassword").value;
            var confirmPassword = document.getElementById("confirmPassword").value;

            // Basic validation
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Store user data in localStorage
            localStorage.setItem(email, JSON.stringify({ username: username, password: password }));

            alert("Successfully Registered");
            console.log("Registration successful for:", username); // Debugging line, can be removed

            // Reset the form or redirect the user as needed
            registrationForm.reset();
        });
    }
});

// Login Stuff
document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Capture the login form input values
            var email = loginForm.querySelector("input[name='email']").value;
            var password = loginForm.querySelector("input[name='password']").value;

            // Attempt to retrieve the user data from localStorage
            var userData = localStorage.getItem(email);
            if (userData) {
                var userObj = JSON.parse(userData);
                // Compare the input password with the stored password
                if (userObj.password === password) {
                    alert("Login successful");
                    console.log("User authenticated:", userObj.username); // For debugging, can be removed

                    // This is a flag that checks if a user is logged in
                    localStorage.setItem('loggedIn', 'true');
                    updateLoginIcon();

                } else {
                    alert("Incorrect password");
                }
            } else {
                alert("User not found");
            }
        });
    }
});

// Forgot Password stuff
document.addEventListener("DOMContentLoaded", function() {
    var forgotPasswordButton = document.getElementById('forgotPassword');
    if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById('forgotPasswordModal').style.display = 'block';
        });
    }

    window.closeModal = function() {
        document.getElementById('forgotPasswordModal').style.display = 'none';
    };
});
window.retrievePassword = function() {
    var username = document.getElementById('forgotUsername').value;
    var email = document.getElementById('forgotEmail').value;

    // Attempt to retrieve the user data from localStorage
    var userData = localStorage.getItem(email);
    if (userData) {
        var userObj = JSON.parse(userData);
        if (userObj.username === username) {
            alert('Your password is: ' + userObj.password);
        } else {
            alert('Username does not match the provided email.');
        }
    } else {
        alert('Email not found.');
    }
};

function updateLoginIcon() {
    const loginIcon = document.getElementById('loginIcon');
    if (localStorage.getItem('loggedIn') === 'true') {
        // User is logged in, change the icon to the logged-in version
        loginIcon.src = 'images/AccountLogin_LI.png';
    } else {
        // User is not logged in, show the default (logged-out) icon
        loginIcon.src = 'images/AccountLogin_NLI.png';
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    updateLoginIcon();
}
