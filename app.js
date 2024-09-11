// app.js

import './src/modules/confetti.min.js';
// Función para cargar el módulo de header
import { initHeader } from './src/modules/header.js';
import { initFooter } from './src/modules/footer.js';
import './src/modules/modal.js';
function loadModules() {
  const path = window.location.pathname;

  // Inicializar el header
  initHeader();
  initFooter();

  // Cargar el módulo específico según la página
  if (path.includes('login.html')) {
    // Solo importar el archivo, no llamamos a ninguna función
    import('./src/modules/login.js');
  } else if (path.includes('register.html')) {
    import('./src/modules/register.js').then(module => module.initRegister());
  } else if (path.includes('user.html')) {
    import('./src/modules/user.js');
  } else if (path.includes('store.html')) {
    import('./src/modules/store.js').then(module => module.initStore());
  }
}

document.addEventListener('DOMContentLoaded', loadModules);
