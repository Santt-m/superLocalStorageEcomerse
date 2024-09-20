import Modal from "../modal.js";

// Función para renderizar la sección de empresas
export function renderSection(section) {
  renderCompaniesSection(section);
}

// Función para renderizar la lista de empresas del usuario
export function renderCompaniesSection(section) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Comprobamos si el array de empresas existe
  if (!loggedInUser.empresas) {
    // Si no existe el array, mostramos un modal de alerta
    const modal = new Modal({
      title: "Advertencia",
      message: "No tienes empresas registradas en tu cuenta.",
      buttonText: "Crear Array de Empresas",
      onClose: () => {
        // Al cerrar el modal, se crea el array de empresas y se guarda
        loggedInUser.empresas = [];
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        renderCompaniesSection(section); // Volvemos a renderizar la sección
      }
    });
    modal.createAlert();
    return; // Evitamos continuar si no hay empresas
  }

  section.innerHTML = `
    <h2>Empresas</h2>
    <div id="company-list">
      ${loggedInUser.empresas.length === 0
        ? `<p>No tienes empresas registradas.</p>`
        : loggedInUser.empresas
            .map((empresa, index) => `
              <div class="company-card">
                <h3>${empresa.nombreEmpresa}</h3>
                <button class="btn btn-view-company" data-index="${index}">Ver</button>
              </div>`)
            .join('')}
    </div>
    <button id="create-company-btn" class="btn btn-create">Crear Nueva Empresa</button>
  `;

  document.getElementById("create-company-btn").addEventListener("click", openCreateCompanyModal);

  document.querySelectorAll(".btn-view-company").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      renderCompanyDetails(section, index);
    });
  });
}

// Función para abrir el modal de creación de empresas
function openCreateCompanyModal() {
  const modal = new Modal({
    title: "Crear Nueva Empresa",
    content: `
      <form id="create-company-form">
        <label>Nombre de la Empresa:</label>
        <input type="text" id="nombreEmpresa" required />
        
        <label>Descripción:</label>
        <textarea id="descripcion" required></textarea>

        <label>Dirección:</label>
        <input type="text" id="direccion" required />
        
        <label>Teléfono:</label>
        <input type="text" id="telefono" required />

        <label>WhatsApp:</label>
        <input type="text" id="whatsapp" required />

        <label>Logo de la Empresa:</label>
        <input type="text" id="logo" required />
        
        <label>Imagen de Fondo:</label>
        <input type="text" id="imagenFondo" required />

        <div id="social-media-section">
          <label>Redes Sociales:</label>
          <button type="button" id="add-social-media-btn">Agregar Red Social</button>
          <div id="social-media-list"></div>
        </div>
        
        <button type="submit">Crear Empresa</button>
      </form>
    `,
    buttonText: "Cerrar"
  });

  modal.createModal();
  addSocialMediaHandler();

  document.getElementById("create-company-form").addEventListener("submit", addCompany);
}

// Función para manejar la creación de la empresa
function addCompany(e) {
  e.preventDefault();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const newCompany = {
    nombreEmpresa: document.getElementById("nombreEmpresa").value,
    descripcion: document.getElementById("descripcion").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    whatsapp: document.getElementById("whatsapp").value,
    logo: document.getElementById("logo").value,
    imagenFondo: document.getElementById("imagenFondo").value,
    redesSociales: getSocialMedia(),
    productos: []
  };

  loggedInUser.empresas.push(newCompany);
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  const alert = new Modal({
    message: `Empresa ${newCompany.nombreEmpresa} creada exitosamente.`,
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  renderCompaniesSection(document.querySelector("section"));
}

// Función para obtener las redes sociales agregadas
function getSocialMedia() {
  const socialMediaInputs = document.querySelectorAll(".social-media-entry");
  const socialMediaArray = [];

  socialMediaInputs.forEach(entry => {
    const name = entry.querySelector(".social-name").value;
    const url = entry.querySelector(".social-url").value;
    socialMediaArray.push({ name, url });
  });

  return socialMediaArray;
}

// Agregar más redes sociales dinámicamente
function addSocialMediaHandler() {
  const addBtn = document.getElementById("add-social-media-btn");
  addBtn.addEventListener("click", () => {
    const socialMediaList = document.getElementById("social-media-list");
    const socialEntry = document.createElement("div");
    socialEntry.classList.add("social-media-entry");
    socialEntry.innerHTML = `
      <input type="text" class="social-name" placeholder="Nombre de la red social" required />
      <input type="text" class="social-url" placeholder="URL de la red social" required />
      <button type="button" class="remove-social-media-btn">Eliminar</button>
    `;

    socialMediaList.appendChild(socialEntry);

    // Agregar evento para eliminar redes sociales
    socialEntry.querySelector(".remove-social-media-btn").addEventListener("click", () => {
      socialEntry.remove();
    });
  });
}

// Función para renderizar los detalles de una empresa seleccionada
function renderCompanyDetails(section, index) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const company = loggedInUser.empresas[index];

  section.innerHTML = `
    <h2>Detalles de la Empresa: ${company.nombreEmpresa}</h2>
    <div class="company-details">
      <p><strong>Descripción:</strong> ${company.descripcion}</p>
      <p><strong>Dirección:</strong> ${company.direccion}</p>
      <p><strong>Teléfono:</strong> ${company.telefono}</p>
      <p><strong>WhatsApp:</strong> ${company.whatsapp}</p>
      <img src="${company.logo}" alt="Logo de la empresa" class="company-logo"/>
      <button id="edit-company-btn">Editar Empresa</button>
      <button id="delete-company-btn">Eliminar Empresa</button>
    </div>
  `;

  // Evento para eliminar empresa
  document.getElementById("delete-company-btn").addEventListener("click", () => {
    loggedInUser.empresas.splice(index, 1);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    renderCompaniesSection(section);
  });

  // Evento para editar empresa (puedes implementar la edición)
}
