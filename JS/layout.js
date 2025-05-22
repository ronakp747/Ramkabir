function loadComponent(id, file) {
    fetch(file)
      .then(res => res.text())
      .then(data => document.getElementById(id).innerHTML = data);
  }
  
  loadComponent('header-container', 'header.html');
  loadComponent('sidebar-container', 'sidebar.html');
  loadComponent('footer-container', 'footer.html');
  