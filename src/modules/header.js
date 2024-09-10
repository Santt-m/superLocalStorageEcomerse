// src/modules/header.js
const headerElement = document.querySelector('header');

// Crear el contenido del header con el menú en forma de tres barras
const headerHTML = `
  <div class="logo">
    <a href="index.html">Mi Tienda</a>
  </div>
  <div class="menu-toggle" id="menu-toggle">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div>
  <nav class="nav-links" id="nav-links">
    <a href="index.html">Inicio</a>
    <a href="store.html">Tienda</a>
    <a href="register.html" id="register-link">Registro</a>
    <a href="login.html" id="login-link">Iniciar sesión</a>
    <div class="user-menu" id="user-menu">
      <a href="user.html" id="user-link">
        <img src="./src/img/profiles/user-solid.svg" alt="Mi cuenta" id="user-avatar">
        Mi cuenta
      </a>
    </div>
  </nav>
`;

// Renderizar el contenido en el DOM
headerElement.innerHTML = headerHTML;

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const userMenu = document.getElementById('user-menu');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const userAvatar = document.getElementById('user-avatar');

// Obtener usuario logueado de localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Mostrar u ocultar el avatar y los enlaces de sesión según si el usuario está logueado
if (loggedInUser) {
  userMenu.style.display = 'flex';
  loginLink.style.display = 'none';
  registerLink.style.display = 'none';

  // Verificación de imagen de perfil y manejo de errores de carga
  userAvatar.src = loggedInUser.avatar || './src/img/profiles/user-solid.svg';
  userAvatar.onerror = () => {
    userAvatar.src = './src/img/default-user.jpg'; // Imagen alternativa si falla
  };
} else {
  userMenu.style.display = 'none';
  loginLink.style.display = 'flex';
  registerLink.style.display = 'flex';
}

// Manejar el evento de clic para el menú desplegable en pantallas pequeñas
menuToggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  menuToggle.classList.toggle('active');
});
