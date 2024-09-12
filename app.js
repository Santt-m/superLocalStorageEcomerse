// app.js
import { initHeader } from './src/modules/header.js';
import { initFooter } from './src/modules/footer.js';
import './src/modules/modal.js';

function loadModules() {
  const path = window.location.pathname;

  // Inicializar header y footer
  initHeader();
  initFooter();

  if (path.includes('login.html')) {
    import('./src/modules/login.js').then(() => {
      console.log('login.js cargado correctamente.');
    }).catch(err => {
      console.error('Error cargando login.js:', err);
    });
  } else if (path.includes('register.html')) {
    import('./src/modules/register.js').then(module => module.initRegister());
  } else if (path.includes('user.html')) {
    import('./src/modules/user.js');
  }
}

document.addEventListener('DOMContentLoaded', loadModules);
