// Wait for the sidebar element to be loaded into the DOM
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');  // hamburger button
  const sidebar = document.getElementById('sidebar');         // sidebar element

  // If either element is missing, log error
  if (!menuToggle) {
    console.error("Menu toggle button (#menu-toggle) not found.");
    return;
  }
  if (!sidebar) {
    console.error("Sidebar (#sidebar) not found.");
    return;
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Optional: hide sidebar when a sidebar link is clicked
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });
});