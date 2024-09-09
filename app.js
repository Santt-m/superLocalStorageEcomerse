// app.js
function loadModule() {
  const path = window.location.pathname;

  if (path.includes('login.html')) {
    import('./src/modules/login.js').then(module => module.initLogin());
  } else if (path.includes('register.html')) {
    import('./src/modules/register.js').then(module => module.initRegister());
  } else if (path.includes('user.html')) {
    import('./src/modules/user.js').then(module => module.initUser());
  } else if (path.includes('store.html')) {
    import('./src/modules/store.js').then(module => module.initStore());
  }

  console.log("App.js cargado en", path);
}

// Solo cargamos cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadModule);
} else {
  loadModule();
}
