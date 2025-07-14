
  const currentUrl = window.location.href;
  document.querySelectorAll('.nav-menu a, .sidebar a').forEach(link => {
      if (link.href === currentUrl) {
          link.classList.add("active");
      }
  });

