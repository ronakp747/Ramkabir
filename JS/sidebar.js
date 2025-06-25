const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('#sidebar a');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});
