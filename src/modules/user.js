import Modal from "./modal.js";

// Código para inicializar la página
const mainContent = document.getElementById("main-content");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  const alert = new Modal({
    message: `Error al cargar el usuario`,
    buttonText: "Aceptar",
    type: "error"
  });
  alert.createAlert();
  // Redirige a login.html luego de 2s
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
} else {
  // Crea una alerta de bienvenida
  const alert = new Modal({
    message: `Bienvenido ${loggedInUser.email}`,
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  // Agregar secciones al contenido principal
  mainContent.appendChild(createUserInfoSection(loggedInUser));
  mainContent.appendChild(createServicesSection());
}

// Función para crear la sección con la información del usuario
export function createUserInfoSection(loggedInUser) {
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

  userSection.querySelector("#edit-user-btn").addEventListener("click", () => {
    const modal = new Modal({
      title: "Editar información del usuario",
      content: `
        <form>
          <label>Nombre:</label>
          <input type="text" value="${loggedInUser.username}" />
          <label>Email:</label>
          <input type="email" value="${loggedInUser.email}" />
          <button type="submit">Guardar</button>
        </form>
      `,
      buttonText: "Cerrar"
    });
    modal.createModal();
  });

  return userSection;
}

// Función para crear la sección de servicios
export function createServicesSection() {
  const servicesSection = document.createElement("section");
  servicesSection.classList.add("services-section");
  
  // Sección para la lista de servicios y la sección de contenido
  servicesSection.innerHTML = `
    <h3>Servicios</h3>
    <div id="services-list"></div>
    <div id="service-content"></div>
  `;

  const servicesList = servicesSection.querySelector("#services-list");
  const serviceContent = servicesSection.querySelector("#service-content");

  // Array con los servicios
  const services = [
    { name: "Inicio", scriptUrl: "./services/dashboard.js", id: "dashboard-section" },
    { name: "Empresas", scriptUrl: "./services/empresas.js", id: "empresas-section" },
    { name: "Pedidos", scriptUrl: "./services/pedidos.js", id: "pedidos-section" },
    { name: "Contabilidad", scriptUrl: "./services/contabilidad.js", id: "contabilidad-section" }
  ];

  // Función para ocultar todas las secciones de servicio
  function hideAllServiceSections() {
    const sections = document.querySelectorAll('.service-section');
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  // Función para cargar dinámicamente el script del servicio
  function loadServiceScript(scriptUrl, sectionId) {
    import(scriptUrl)
      .then(module => {
        serviceContent.innerHTML = ''; // Limpiar contenido actual
        const section = document.createElement('section');
        section.id = sectionId;
        section.classList.add('service-section');
        section.style.display = 'flex';
        serviceContent.appendChild(section);
        module.renderSection(section); // Renderizar el contenido
      })
      .catch(error => {
        const alert = new Modal({
          message: `Error al cargar el script: ${error.message}`,
          buttonText: "Aceptar",
          type: "error"
        });
        alert.createAlert();
      });
  }

  // Crear los botones de servicio y agregar el evento click
  services.forEach(service => {
    const button = document.createElement('button');
    button.textContent = service.name;
    button.classList.add('btn', 'service-btn');
    
    button.addEventListener('click', () => {
      hideAllServiceSections();
      loadServiceScript(service.scriptUrl, service.id);
    });
    
    servicesList.appendChild(button);
  });

  return servicesSection;
}
