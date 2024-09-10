// src/app.js
import './src/modules/header.js';

import './src/modules/user.js';
import './src/modules/login.js';
import './src/modules/register.js';

import { createModal } from './src/modules/modal.js';

function loadModules() {
  const pathname = window.location.pathname;

  // Cargar módulos según la página
  if (pathname.includes('user.html')) {
    // Ejemplo de cómo usar modal:
    createModal('<h2>¡Bienvenido a tu panel de usuario!</h2>', { autoClose: 3000 });
  } else if (pathname.includes('login.html')) {
    // Cargar script de login
  }
}

loadModules();
