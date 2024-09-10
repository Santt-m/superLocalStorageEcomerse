// app.js

// Función para cargar el módulo de header
import { initHeader } from './src/modules/header.js';

function loadModules() {
  const path = window.location.pathname;

  // Inicializar el header
  initHeader();

  // Cargar el módulo específico según la página
  if (path.includes('login.html')) {
    import('./src/modules/login.js').then(module => module.initLogin());
  } else if (path.includes('register.html')) {
    import('./src/modules/register.js').then(module => module.initRegister());
  } else if (path.includes('user.html')) {
    import('./src/modules/user.js').then(module => module.initUser());
  } else if (path.includes('store.html')) {
    import('./src/modules/store.js').then(module => module.initStore());
  }
}

document.addEventListener('DOMContentLoaded', loadModules);
