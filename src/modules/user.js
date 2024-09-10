// src/modules/user.js

import { createModal, createAlert } from './modal.js';  // Usaremos ambos: modal y alert

// Seleccionar el contenedor principal donde se generará todo dinámicamente
const mainContent = document.getElementById('main-content');

// Obtener usuario logueado desde localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Verificación de que el usuario está logueado
if (!loggedInUser) {
  window.location.href = 'login.html';
}

// Función para generar la sección de información del usuario
function generateUserInfoSection() {
  const userSection = document.createElement('section');
  userSection.classList.add('user-section');

  userSection.innerHTML = `
    <h1>Información del Usuario</h1>
    <div id="profile-info">
      <p><strong>Usuario:</strong> ${loggedInUser.username}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
      <img src="${loggedInUser.profileImage || './src/img/profiles/user-solid.svg'}" alt="Perfil" style="width: 100px; height: 100px; border-radius: 50%;">
    </div>
    <button id="edit-user-btn" class="btn">Editar Información</button>
  `;

  mainContent.appendChild(userSection);

  // Botón para editar la información del usuario usando modal
  document.getElementById('edit-user-btn').addEventListener('click', () => {
    createModal(`
      <h2>Editar información del usuario</h2>
      <form>
        <label>Nombre:</label>
        <input type="text" value="${loggedInUser.username}" />
        <label>Email:</label>
        <input type="email" value="${loggedInUser.email}" />
        <button type="submit">Guardar</button>
      </form>
    `);
  });
}

// Función para generar la sección de servicios
function generateServicesSection() {
  const servicesSection = document.createElement('section');
  servicesSection.classList.add('services-section');

  servicesSection.innerHTML = `
    <h2>Servicios</h2>
    <button id="manage-stores-btn" class="btn">Locales</button>
    <!-- Botones adicionales para envíos y contabilidad en el futuro -->
  `;

  mainContent.appendChild(servicesSection);

  // Mostrar la sección de comercios cuando se hace clic en "Locales"
  document.getElementById('manage-stores-btn').addEventListener('click', () => {
    createAlert('Acción en desarrollo: Gestión de locales');
  });
}

// Generar todas las secciones dinámicamente
function generateUserPage() {
  generateUserInfoSection();
  generateServicesSection();
}

// Iniciar la generación del contenido
generateUserPage();
