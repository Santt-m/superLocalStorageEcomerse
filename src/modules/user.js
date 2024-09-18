import { createAlert, createModal } from "./modal.js";

const mainContent = document.getElementById("main-content");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  createAlert(
    "No se encontró un usuario logueado, redirigiendo a login...",
    3000,
    "warning"
  );
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
} else {
  createAlert(`Bienvenido, ${loggedInUser.username}`, 3000, "success");
}

// Función para ocultar todas las secciones de servicios
function hideAllServiceSections() {
  const serviceSections = document.querySelectorAll('.service-section');
  serviceSections.forEach(section => {
    section.style.display = 'none';
  });
}

// Función para cargar dinámicamente los scripts de los servicios
function loadServiceScript(serviceName, section) {
  switch (serviceName) {
    case 'locales':
      import('./services/locales.js')  // Ruta correcta
        .then(module => module.renderSection(section))
        .catch(error => {
          createAlert(`Error al cargar el script de Locales: ${error.message}`, 3000, "error");
        });
      break;
    case 'envios':
      import('./services/envios.js')  // Ruta correcta
        .then(module => module.renderSection(section))
        .catch(error => {
          createAlert(`Error al cargar el script de Envíos: ${error.message}`, 3000, "error");
        });
      break;
    case 'stock':
      import('./services/stock.js')  // Ruta correcta
        .then(module => module.renderSection(section))
        .catch(error => {
          createAlert(`Error al cargar el script de Stock: ${error.message}`, 3000, "error");
        });
      break;
    case 'contabilidad':
      import('./services/contabilidad.js')  // Ruta correcta
        .then(module => module.renderSection(section))
        .catch(error => {
          createAlert(`Error al cargar el script de Contabilidad: ${error.message}`, 3000, "error");
        });
      break;
    case 'pedidos':
      import('./services/pedidos.js')  // Ruta correcta
        .then(module => module.renderSection(section))
        .catch(error => {
          createAlert(`Error al cargar el script de Pedidos: ${error.message}`, 3000, "error");
        });
      break;
    default:
      createAlert("Servicio no encontrado", 3000, "error");
  }
}

// Función para generar los botones de servicios
function generateServiceButton(serviceName, serviceId) {
  const button = document.createElement('button');
  button.textContent = serviceName;
  button.classList.add('btn', 'service-btn');

  button.addEventListener('click', () => {
    let serviceSection = document.getElementById(serviceId);

    // Si la sección no existe, la creamos
    if (!serviceSection) {
      serviceSection = document.createElement('section');
      serviceSection.id = serviceId;
      serviceSection.classList.add('service-section');
      mainContent.appendChild(serviceSection);

      // Cargar dinámicamente el script correspondiente
      loadServiceScript(serviceName, serviceSection);
    }

    // Ocultamos todas las demás secciones de servicio
    hideAllServiceSections();

    // Mostramos la sección actual
    serviceSection.style.display = 'flex';
  });

  return button;
}

// Función para generar la sección de servicios
function generateServicesSection() {
  const servicesSection = document.createElement("section");
  servicesSection.classList.add("services-section");
  servicesSection.innerHTML = `
    <h3>Servicios</h3>
    <div id="services-list"></div>
  `;

  const servicesList = servicesSection.querySelector('#services-list');

  // Crear los botones de servicios y agregar las secciones correspondientes
  servicesList.appendChild(generateServiceButton("Locales", "locales-section"));
  servicesList.appendChild(generateServiceButton("Envíos", "envios-section"));
  servicesList.appendChild(generateServiceButton("Stock", "stock-section"));
  servicesList.appendChild(generateServiceButton("Contabilidad", "contabilidad-section"));
  servicesList.appendChild(generateServiceButton("Pedidos", "pedidos-section"));

  mainContent.appendChild(servicesSection);
}

// Función para generar la sección de información del usuario
function generateUserInfoSection() {
  const userSection = document.createElement("section");
  userSection.classList.add("user-section");

  const profileImage =
    loggedInUser.profileImage || "./src/img/profiles/user-solid.svg"; // Usar imagen predeterminada si no existe

  userSection.innerHTML = `
    <h1>Información del Usuario</h1>
    <div id="profile-info">
      <p><strong>Usuario:</strong> ${loggedInUser.username}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
      <img src="${profileImage}" alt="Perfil">
    </div>
    <button id="edit-user-btn" class="btn">Editar Información</button>
  `;

  mainContent.appendChild(userSection);

  document.getElementById("edit-user-btn").addEventListener("click", () => {
    createModal(
      `
      <form>
        <label>Nombre:</label>
        <input type="text" value="${loggedInUser.username}" />
        <label>Email:</label>
        <input type="email" value="${loggedInUser.email}" />
        <button type="submit">Guardar</button>
      </form>
    `,
      "Editar información del usuario"
    );
  });
}

// Generar todas las secciones dinámicamente
function generateUserPage() {
  generateUserInfoSection();
  generateServicesSection();
}

// Iniciar la generación del contenido
generateUserPage();
