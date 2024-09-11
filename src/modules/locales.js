import { createModal, createAlert } from './modal.js';

export function renderSection(mainContent) {
  const localesSection = document.createElement('section');
  localesSection.id = 'locales-section';
  localesSection.classList.add('service-section');
  
  localesSection.innerHTML = `
    <h3>Locales</h3>
    <button id="add-local-btn" class="btn">Agregar Local</button>
    <div id="local-list"></div>
  `;
  
  mainContent.appendChild(localesSection);

  // Event listener para abrir el modal de agregar nuevo local
  document.getElementById('add-local-btn').addEventListener('click', () => {
    createModal(`
      <h2>Agregar Nuevo Local</h2>
      <form id="local-form">
        <label>Nombre:</label>
        <input type="text" name="nombre" required>
        <label>Dirección:</label>
        <input type="text" name="direccion" required>
        <label>WhatsApp:</label>
        <input type="text" name="whatsapp" required>
        <!-- Otros campos relevantes -->
        <button type="submit">Guardar Local</button>
      </form>
    `);

    // Event listener para el formulario
    document.getElementById('local-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newLocal = {
        id: Date.now(),  // Generar un ID único basado en la fecha actual
        nombre: formData.get('nombre'),
        direccion: formData.get('direccion'),
        whatsapp: formData.get('whatsapp'),
        // Otros campos como redes sociales, horarios, etc.
      };

      addLocalToUser(newLocal);  // Añadir el local al array de empresas del usuario
      document.body.removeChild(document.querySelector('.modal-overlay'));  // Cerrar el modal
    });
  });

  renderUserLocales();  // Renderizar los locales existentes del usuario
}

// Función para añadir el nuevo local al usuario logueado
function addLocalToUser(local) {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (loggedInUser) {
    if (!loggedInUser.empresas) {
      loggedInUser.empresas = [];  // Si no tiene empresas, crear el array
    }
    loggedInUser.empresas.push(local);  // Añadir la nueva empresa
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));  // Guardar los cambios en localStorage
    
    // Actualizar también la lista de usuarios en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => user.email === loggedInUser.email ? loggedInUser : user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    renderUserLocales();  // Volver a renderizar la lista de locales
    createAlert('Local agregado con éxito', 3000, 'success');
  }
}

// Función para renderizar los locales del usuario logueado
function renderUserLocales() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const localList = document.getElementById('local-list');
  localList.innerHTML = '';  // Limpiar lista

  if (loggedInUser && loggedInUser.empresas && loggedInUser.empresas.length > 0) {
    loggedInUser.empresas.forEach(local => {
      const localElement = document.createElement('div');
      localElement.classList.add('local-card');
      
      localElement.innerHTML = `
        <h4>${local.nombre}</h4>
        <p><strong>Dirección:</strong> ${local.direccion}</p>
        <p><strong>WhatsApp:</strong> ${local.whatsapp}</p>
        <button class="btn-edit" data-id="${local.id}">Editar</button>
        <button class="btn-delete" data-id="${local.id}">Eliminar</button>
      `;
      
      localElement.querySelector('.btn-edit').addEventListener('click', () => editLocal(local.id));
      localElement.querySelector('.btn-delete').addEventListener('click', () => deleteLocal(local.id));
      
      localList.appendChild(localElement);
    });
  } else {
    localList.innerHTML = '<p>No has creado ningún local todavía.</p>';
  }
}

// Función para editar un local
function editLocal(localId) {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const local = loggedInUser.empresas.find(local => local.id === localId);

  if (local) {
    createModal(`
      <h2>Editar Local</h2>
      <form id="edit-local-form">
        <label>Nombre:</label>
        <input type="text" name="nombre" value="${local.nombre}" required>
        <label>Dirección:</label>
        <input type="text" name="direccion" value="${local.direccion}" required>
        <label>WhatsApp:</label>
        <input type="text" name="whatsapp" value="${local.whatsapp}" required>
        <button type="submit">Guardar Cambios</button>
      </form>
    `);

    document.getElementById('edit-local-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      // Actualizar los datos del local
      local.nombre = formData.get('nombre');
      local.direccion = formData.get('direccion');
      local.whatsapp = formData.get('whatsapp');

      // Guardar los cambios en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(user => user.email === loggedInUser.email ? loggedInUser : user);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      renderUserLocales();  // Volver a renderizar la lista de locales
      document.body.removeChild(document.querySelector('.modal-overlay'));  // Cerrar el modal
      createAlert('Local editado con éxito', 3000, 'success');
    });
  }
}

// Función para eliminar un local
function deleteLocal(localId) {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  // Filtrar los locales del usuario, quitando el que se va a eliminar
  loggedInUser.empresas = loggedInUser.empresas.filter(local => local.id !== localId);
  
  // Guardar los cambios en localStorage
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map(user => user.email === loggedInUser.email ? loggedInUser : user);
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  renderUserLocales();  // Volver a renderizar la lista de locales
  createAlert('Local eliminado con éxito', 3000, 'error');
}
