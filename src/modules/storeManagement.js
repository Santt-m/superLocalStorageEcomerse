// src/modules/storeManagement.js

import { createModal } from './modal.js';  // Usaremos modal aquí

// Función para generar la sección de comercios
export function generateStoresSection() {
  const storesSection = document.createElement('section');
  storesSection.classList.add('stores-section');

  storesSection.innerHTML = `
    <h2>Mis Comercios</h2>
    <button id="create-company-btn" class="btn">Crear Comercio</button>
    <div id="company-list"></div>
  `;

  const mainContent = document.getElementById('main-content');
  mainContent.appendChild(storesSection);

  const companyList = document.getElementById('company-list');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Verificación de empresas y renderización
  if (loggedInUser.empresas && loggedInUser.empresas.length > 0) {
    loggedInUser.empresas.forEach(empresa => {
      const companyElement = document.createElement('div');
      companyElement.innerHTML = `
        <h3>${empresa.nombreEmpresa}</h3>
        <p>${empresa.descripcion}</p>
        <button class="btn edit-company-btn">Editar Empresa</button>
      `;
      companyList.appendChild(companyElement);

      // Botón para editar la empresa
      companyElement.querySelector('.edit-company-btn').addEventListener('click', () => {
        createModal(`
          <h2>Editar Empresa: ${empresa.nombreEmpresa}</h2>
          <form>
            <label>Nombre:</label>
            <input type="text" value="${empresa.nombreEmpresa}" />
            <label>Descripción:</label>
            <textarea>${empresa.descripcion}</textarea>
            <button type="submit">Guardar</button>
          </form>
        `);
      });
    });
  } else {
    companyList.innerHTML = '<p>No has creado ninguna empresa todavía.</p>';
  }

  // Botón para crear una nueva empresa
  document.getElementById('create-company-btn').addEventListener('click', () => {
    createModal(`
      <h2>Crear nueva empresa</h2>
      <form>
        <label>Nombre de la Empresa:</label>
        <input type="text" placeholder="Nombre de la empresa" />
        <label>Descripción:</label>
        <textarea placeholder="Descripción de la empresa"></textarea>
        <button type="submit">Crear</button>
      </form>
    `);
  });
}
