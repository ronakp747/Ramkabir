function loadComponent(id, file) {
    fetch(file)
      .then(res => res.text())
      .then(data => document.getElementById(id).innerHTML = data);
  }
  
  loadComponent('TopBar', 'TopBar.html');
  loadComponent('SideBar', 'SideBar.html');