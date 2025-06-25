document.addEventListener('DOMContentLoaded', () => {
  const checkForSidebar = setInterval(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
      clearInterval(checkForSidebar);

      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });

      // Close sidebar when any link is clicked
      sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          sidebar.classList.remove('active');
        });
      });
    }
  }, 100); // check every 100ms
});
