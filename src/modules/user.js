import { createAlert } from "./modal.js"; // Asegúrate de que esta importación esté funcionando

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

// Función para manejar la carga de módulos y capturar errores
function loadModule(serviceName, loadFunction) {
  try {
    createAlert(`Cargando servicio: ${serviceName}`, 3000, "default");
    loadFunction();
  } catch (error) {
    createAlert(
      `Error al cargar el servicio ${serviceName}: ${error.message}`,
      3000,
      "error"
    );
    console.error(`Error al cargar ${serviceName}:`, error);
  }
}

function loadLocales() {
  import("./locales.js")
    .then((module) => module.renderSection(mainContent))
    .catch((error) => {
      createAlert(`Error al cargar locales: ${error.message}`, 3000, "error");
      console.error("Error en locales.js:", error);
    });
}

function loadPedidos() {
  import("./pedidos.js")
    .then((module) => module.renderSection(mainContent))
    .catch((error) => {
      createAlert(`Error al cargar pedidos: ${error.message}`, 3000, "error");
      console.error("Error en pedidos.js:", error);
    });
}
function loadEnvios() {
  import("./envios.js")
    .then((module) => module.renderSection(mainContent))
    .catch((error) => {
      createAlert(`Error al cargar pedidos: ${error.message}`, 3000, "error");
      console.error("Error en envios.js:", error);
    });
}

function loadStock() {
  import("./stock.js")
    .then((module) => module.renderSection(mainContent))
    .catch((error) => {
      createAlert(`Error al cargar pedidos: ${error.message}`, 3000, "error");
      console.error("Error en stock.js:", error);
    });
}

function loadContabilidad() {
  import("./contabilidad.js")
    .then((module) => module.renderSection(mainContent))
    .catch((error) => {
      createAlert(`Error al cargar pedidos: ${error.message}`, 3000, "error");
      console.error("Error en contabilidad.js:", error);
    });
}

// Función para generar los botones de servicio y cargar el script correspondiente
function generateServiceButton(serviceName, loadServiceFunction) {
  const button = document.createElement('button');
  button.classList.add('btn-services');
  button.textContent = serviceName;

  button.addEventListener('click', () => {
    hideAllServiceSections();
    loadModule(serviceName, loadServiceFunction);  // Llamada a la función con manejo de errores
  });

  return button;
}

// Función para generar la sección de servicios y agregar los botones
function generateServicesSection() {
  const servicesSection = document.createElement("section");
  servicesSection.classList.add("services-section");

  servicesSection.innerHTML = `<h2>Servicios</h2>`;

  const serviceButtonsContainer = document.createElement("div");
  serviceButtonsContainer.classList.add("services-buttons-container");

  // Crear botones de servicio, asignando el nombre del servicio, id de la sección y el nombre del script
  serviceButtonsContainer.appendChild(
    generateServiceButton("Locales", "locales-section", loadLocales)
  );
  serviceButtonsContainer.appendChild(
    generateServiceButton("Pedidos", "pedidos-section", loadPedidos)
  );
  serviceButtonsContainer.appendChild(
    generateServiceButton("Envíos", "envios-section", loadEnvios)
  );
  serviceButtonsContainer.appendChild(
    generateServiceButton("Stock", "stock-section", loadStock)
  );
  serviceButtonsContainer.appendChild(
    generateServiceButton(
      "Contabilidad",
      "contabilidad-section",
      loadContabilidad
    )
  );

  servicesSection.appendChild(serviceButtonsContainer);
  mainContent.appendChild(servicesSection);
}

// Función para generar la sección de información del usuario
function generateUserInfoSection() {
  const userSection = document.createElement("section");
  userSection.classList.add("user-section");

  const profileImage = getProfileImage(loggedInUser); // Usar la función para obtener la imagen

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
