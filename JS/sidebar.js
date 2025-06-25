// Get hamburger button and sidebar element
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Get all links inside sidebar
const sidebarLinks = sidebar.querySelectorAll('a');

// Toggle sidebar visibility when hamburger clicked
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Hide sidebar when any sidebar link is clicked
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});
