document.addEventListener("DOMContentLoaded", function() {
  const bodyElement = document.body;
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const darkModeToggleLink = document.querySelector("#hamburgerDropdown a");

  function setDarkMode(state) {
    bodyElement.classList[state ? 'add' : 'remove']("dark-mode");
    hamburgerIcon.src = state ? 'images/DarkModeHamburgerIcon.png' : 'images/LightModeHamburgerIcon.png';
    if (darkModeToggleLink) {
      darkModeToggleLink.textContent = state ? "Light Mode" : "Dark Mode";
    }
  }

  function toggleDarkMode() {
    const isDarkMode = bodyElement.classList.contains("dark-mode");
    // Save the new state in localStorage
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    setDarkMode(!isDarkMode);
  }

  // Load the dark mode state from localStorage and apply it
  function loadDarkModeSetting() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode !== null) {
      setDarkMode(isDarkMode);
    }
  }

  loadDarkModeSetting();

  if (darkModeToggleLink) {
    darkModeToggleLink.addEventListener('click', toggleDarkMode);
  }
});
