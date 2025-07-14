// Load both layouts and then run the highlight function
Promise.all([
    fetch('layout/TopBar.html').then(res => res.text()),
    fetch('layout/SideBar.html').then(res => res.text())
  ]).then(([topBarHTML, sideBarHTML]) => {
    document.getElementById('TopBar').innerHTML = topBarHTML;
    document.getElementById('SideBar').innerHTML = sideBarHTML;
    highlightActiveLink(); // <-- runs AFTER both are inserted
  });
  
  function highlightActiveLink() {
    const currentUrl = window.location.href;
    document.querySelectorAll('.nav-menu a, .sidebar a').forEach(link => {
      if (link.href === currentUrl) {
        link.classList.add("active");
      }
    });
  }
  