function initSidebarToggle() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if (!menuToggle || !sidebar) {
    console.error("Sidebar or menu toggle not found.");
    return;
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });
}
