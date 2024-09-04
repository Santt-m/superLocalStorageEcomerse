// Función global para recargar la aplicación desde otros scripts
window.reloadApp = () => {
    console.log('Recargando la aplicación...');
    init();
  };
  
  // Función global para ocultar todas las secciones
  window.hideAllSections = () => {
    console.log('Ocultando todas las secciones');
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
  };
  
  // Función para crear una sección con un ID específico
  window.createSection = (id) => {
    console.log(`Creando o mostrando la sección con ID: ${id}`);
    let section = document.getElementById(id);
    if (!section) {
      section = document.createElement('section');
      section.id = id;
      section.style.display = 'flex';
      document.getElementById('app').appendChild(section);
    }
    section.style.display = 'flex';
    return section;
  };
  
  // Función para verificar si los arrays en localStorage existen
  const checkLocalStorage = () => {
    const requiredKeys = ['usuarios', 'roles'];
    return requiredKeys.every(key => localStorage.getItem(key));
  };
  
  // Función para cargar la página de inicio
  const loadHome = async () => {
    console.log('Cargando la página de inicio...');
    createSection('loadHome');
    await import('./src/modules/home.js')
      .then(() => console.log('Módulo home.js cargado correctamente'))
      .catch(err => console.error('Error al cargar home.js:', err));
  
    // Crear y cargar la sección de gestión de localStorage
    createSection('loadLocalStorageManager');
    await import('./src/modules/localStorageManager.js')
      .then(() => console.log('Módulo localStorageManager.js cargado correctamente'))
      .catch(err => console.error('Error al cargar localStorageManager.js:', err));
  };
  
  // Función para cargar login/registro
  const loadLoginRegister = async () => {
    createSection('loadLoginRegister');
    await import('./src/modules/loginRegister.js')
      .then(() => console.log('Módulo loginRegister.js cargado correctamente'))
      .catch(err => console.error('Error al cargar loginRegister.js:', err));
  };
  
  // Función para cargar el dashboard del usuario
  const loadUserDashboard = async () => {
    console.log('Ocultando todas las secciones y cargando el dashboard del usuario...');
    hideAllSections();
    createSection('loadUserDashboard');
    await import('./src/modules/userDashboard.js')
      .then(() => console.log('Módulo userDashboard.js cargado correctamente'))
      .catch(err => console.error('Error al cargar userDashboard.js:', err));
  };
  
  // Función para cargar una tienda específica desde la URL
  const loadTienda = async (tiendaID) => {
    console.log(`Ocultando todas las secciones y cargando la tienda con ID: ${tiendaID}`);
    hideAllSections();
    createSection('loadTienda');
    await import('./src/modules/tienda.js')
      .then(() => console.log('Módulo tienda.js cargado correctamente'))
      .catch(err => console.error('Error al cargar tienda.js:', err));
  };
  
  // Función para obtener el usuario logueado
  const getLoggedUser = () => {
    console.log('Obteniendo el usuario logueado...');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user || null; // Retornar el usuario logueado o null si no hay usuario logueado
  };
  
  // Función principal que inicia la aplicación
  const init = () => {
    console.log('Iniciando la aplicación...');
    
    // Paso 1: Mostrar Home y LocalStorage Manager
    loadHome();
  
    // Paso 2: Verificar localStorage y proceder con la lógica
    if (checkLocalStorage()) {
      const user = getLoggedUser();
      const params = new URLSearchParams(window.location.search);
      const tiendaID = params.get('tienda');
  
      if (tiendaID) {
        console.log('Parámetro de tienda encontrado en la URL, cargando tienda...');
        loadTienda(tiendaID);
      } else if (!user) {
        console.log('No se encontró usuario logueado, redirigiendo a login/registro...');
        loadLoginRegister();
      } else {
        console.log('Usuario logueado encontrado, cargando dashboard del usuario...');
        loadUserDashboard();
      }
    } else {
      console.log('No se encontraron los datos en localStorage, el usuario debe instalar los datos.');
    }
  };
  
  // Ejecutar la función init cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', init);
  