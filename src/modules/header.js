// src/modules/header.js

export function initHeader() {
    const headerElement = document.querySelector('header');
  
    if (!headerElement) {
      console.error('No se encontró el elemento header en el DOM.');
      return;
    }
  
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
  
    headerElement.innerHTML = headerHTML;
  
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const userMenu = document.getElementById('user-menu');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userAvatar = document.getElementById('user-avatar');
  
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    // Mostrar u ocultar el avatar y los enlaces de sesión según si el usuario está logueado
    if (loggedInUser) {
      userMenu.style.display = 'flex';
      loginLink.style.display = 'none';
      registerLink.style.display = 'none';
  
      // Verificación de imagen de perfil
      userAvatar.src = loggedInUser.avatar || './src/img/profiles/user-solid.svg';
  
      // error si la imagen no se encuentra
      userAvatar.onerror = () => {
        userAvatar.src = './src/img/profiles/user-solid.svg';
      };
    } else {
      userMenu.style.display = 'none';
      loginLink.style.display = 'flex';
      registerLink.style.display = 'flex';
    }
  
    // Manejar el evento de clic para el menú desplegable en mobile
    menuToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      menuToggle.classList.toggle('active');
    });
  }
  