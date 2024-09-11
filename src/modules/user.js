// Seleccionar el contenedor principal donde se generará todo dinámicamente
const mainContent = document.getElementById("main-content");

// Obtener usuario logueado desde localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Verificación de que el usuario está logueado
if (!loggedInUser) {
  window.location.href = "login.html";
}

// Función para obtener la imagen de perfil o aplicar el SVG por defecto
function getProfileImage(user) {
  return user.profileImage && user.profileImage.trim() !== ""
    ? user.profileImage
    : "./src/img/profiles/user-solid.svg";
}

// Función para ocultar todas las secciones de servicio
function hideAllServiceSections() {
  const serviceSections = document.querySelectorAll('.service-section');
  serviceSections.forEach(section => {
    section.style.display = 'none';
  });
}

// Función para cargar el script del servicio y renderizar la sección correspondiente
function loadLocales() {
  import('./locales.js').then(module => module.renderSection(mainContent));
}

function loadPedidos() {
  import('./pedidos.js').then(module => module.renderSection(mainContent));
}

function loadEnvios() {
  import('./envios.js').then(module => module.renderSection(mainContent));
}

function loadStock() {
  import('./stock.js').then(module => module.renderSection(mainContent));
}

function loadContabilidad() {
  import('./contabilidad.js').then(module => module.renderSection(mainContent));
}

// Función para generar los botones de servicio y cargar el script correspondiente
function generateServiceButton(serviceName, sectionId, loadServiceFunction) {
  const button = document.createElement('button');
  button.classList.add('btn-services');
  button.textContent = serviceName;

  button.addEventListener('click', () => {
    hideAllServiceSections();  // Ocultar todas las secciones antes de mostrar la nueva
    loadServiceFunction();  // Cargar el script correspondiente
  });

  return button;
}

// Función para generar la sección de servicios y agregar los botones
function generateServicesSection() {
  const servicesSection = document.createElement("section");
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `<h2>Servicios</h2>`;

  const serviceButtonsContainer = document.createElement('div');
  serviceButtonsContainer.classList.add('services-buttons-container');

  // Crear botones de servicio, asignando el nombre del servicio, id de la sección y el nombre del script
  serviceButtonsContainer.appendChild(generateServiceButton('Locales', 'locales-section', loadLocales));
  serviceButtonsContainer.appendChild(generateServiceButton('Pedidos', 'pedidos-section', loadPedidos));
  serviceButtonsContainer.appendChild(generateServiceButton('Envíos', 'envios-section', loadEnvios));
  serviceButtonsContainer.appendChild(generateServiceButton('Stock', 'stock-section', loadStock));
  serviceButtonsContainer.appendChild(generateServiceButton('Contabilidad', 'contabilidad-section', loadContabilidad));

  servicesSection.appendChild(serviceButtonsContainer);
  mainContent.appendChild(servicesSection);
}

// Función para generar la sección de información del usuario
function generateUserInfoSection() {
  const userSection = document.createElement("section");
  userSection.classList.add("user-section");

  const profileImage = getProfileImage(loggedInUser);  // Usar la función para obtener la imagen

  userSection.innerHTML = `
    <h1>Información del Usuario</h1>
    <div id="profile-info">
      <p><strong>Usuario:</strong> ${loggedInUser.username}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
      <img src="${profileImage}" alt="Perfil" style="width: 100px; height: 100px; border-radius: 50%;">
    </div>
    <button id="edit-user-btn" class="btn">Editar Información</button>
  `;

  mainContent.appendChild(userSection);

  document.getElementById("edit-user-btn").addEventListener("click", () => {
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

// Generar todas las secciones dinámicamente
function generateUserPage() {
  generateUserInfoSection();
  generateServicesSection();
}

// Iniciar la generación del contenido
generateUserPage();
