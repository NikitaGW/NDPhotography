// Navbar toggle for mobile
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// Close mobile menu and dropdowns
function closeMenu() {
  document.getElementById("navLinks").classList.remove("show");
  document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
}

// Toggle dropdown functionality (mobile only)
function toggleDropdown(e) {
  if (window.innerWidth <= 991) {
    const content = e.target.nextElementSibling;
    const isOpen = content && content.classList.contains("show");

    if (!isOpen) {
      // Prevent navigation on first tap
      e.preventDefault();

      // Close all other open dropdowns
      document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));

      // Open selected dropdown
      if (content) {
        content.classList.add("show");
      }
    }
    // Let second tap proceed with link navigation
  }
}

// Optional: close menu when clicking outside in mobile
window.addEventListener('click', function (e) {
  const nav = document.getElementById('navLinks');
  const menuIcon = document.querySelector('.menu-icon');
  if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
    closeMenu();
  }
});
