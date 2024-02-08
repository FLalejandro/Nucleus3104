document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("#register form");
  form.onsubmit = function(event) {
    event.preventDefault();

    // Validate passwords
    var password = document.getElementById("regPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var messageContainer = document.getElementById("message");

    if (password === confirmPassword && password) {
      messageContainer.textContent = "Successfully Registered";
      messageContainer.style.color = "green";
      form.reset();
    } else {
      // Show an error message if passwords do not match
      messageContainer.textContent = "Passwords do not Match";
      messageContainer.style.color = "red";
    }
  };
});
