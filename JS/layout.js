
fetch('layout/TopBar.html')
    .then(response => response.text())
    .then(data => document.getElementById('TopBar').innerHTML = data);
fetch('layout/SideBar.html')
    .then(response => response.text())
    .then(data => document.getElementById('SideBar').innerHTML = data);

