let toggler = document.getElementById('toggle');
let menu = document.getElementById('menu');
let dashboard = document.getElementById('dash');

toggler.onclick = () => {
  menu.style.display = 'block';
  menu.classList.add('toggled-nav');
}
