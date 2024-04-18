document.addEventListener("DOMContentLoaded", function() {
  // Toggle the dropdown menu
  function toggleDropdown() {
    var dropdown = document.getElementById("hamburgerDropdown");
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    } else {
      console.error("The dropdown element was not found in the DOM.");
    }
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.hamburger-icon img')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  }

  // Attach the toggleDropdown function to the hamburger menu click event
  var hamburgerIcon = document.querySelector('.hamburger-icon img');
  if (hamburgerIcon) {
    hamburgerIcon.onclick = toggleDropdown;
  } else {
    console.error("The hamburger icon was not found in the DOM.");
  }
});
