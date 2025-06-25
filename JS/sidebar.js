// Load Top Bar
fetch('testingtopbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('TopBar').innerHTML = data;
  });

// Load Sidebar and attach toggle logic
fetch('layout/SideBar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('SideBar').innerHTML = data;

    // Wait until both sidebar and toggle button exist
    const interval = setInterval(() => {
      const menuToggle = document.getElementById('menu-toggle');
      const sidebar = document.getElementById('sidebar');

      if (menuToggle && sidebar) {
        clearInterval(interval);

        menuToggle.addEventListener('click', () => {
          sidebar.classList.toggle('active');
        });

        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
          link.addEventListener('click', () => {
            sidebar.classList.remove('active');
          });
        });
      }
    }, 100); // Wait for elements to load
  });
