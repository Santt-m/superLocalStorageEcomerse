import Modal from "../modal.js";

// Función para renderizar la sección de e-commerce
export function renderSection(section) {
  renderEcommerceSection(section);
}

// Función para renderizar la lista de e-commerce del usuario
export function renderEcommerceSection(section) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Verificar si el usuario tiene e-commerce
  if (!loggedInUser.ecommerce) {
    loggedInUser.ecommerce = [];
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    const alert = new Modal({
      title: "Información",
      message: "Se ha creado automáticamente un array para tus e-commerce.",
      buttonText: "Aceptar"
    });
    alert.createAlert();
  }

  section.innerHTML = `
    <h2>Mis E-commerce</h2>
    <div id="ecommerce-list" role="region" aria-label="Lista de e-commerce">
      ${loggedInUser.ecommerce.length === 0
        ? `<p>No tienes e-commerce registrados.</p>`
        : loggedInUser.ecommerce.map((ecommerce, index) => `
            <div class="ecommerce-card" tabindex="0" role="article" aria-labelledby="ecommerce-${index}-nombre">
              <h3 id="ecommerce-${index}-nombre">${ecommerce.nombre}</h3>
              <p><strong>Descripción:</strong> ${ecommerce.descripcion}</p>
              <p><strong>URL:</strong> <a href="${ecommerce.url}" target="_blank">${ecommerce.url}</a></p>
              <div class="ecommerce-actions">
                <button class="btn btn-view-ecommerce" data-index="${index}" aria-label="Ver detalles de ${ecommerce.nombre}">Ver</button>
                <button class="btn btn-view-products" data-index="${index}" aria-label="Ver productos de ${ecommerce.nombre}">Productos</button>
              </div>
            </div>
          `).join('')}
    </div>
    <button id="create-ecommerce-btn" class="btn btn-create" aria-label="Crear nuevo e-commerce">Crear Nuevo E-commerce</button>
  `;

  document.getElementById("create-ecommerce-btn").addEventListener("click", openCreateEcommerceModal);

  document.querySelectorAll(".btn-view-ecommerce").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      openEditEcommerceModal(section, index);
    });
  });

  document.querySelectorAll(".btn-view-products").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      renderProductList(section, index);
    });
  });
}

// Función para abrir el modal de creación de e-commerce
function openCreateEcommerceModal() {
  const modal = new Modal({
    title: "Crear Nuevo E-commerce",
    content: getStepContent(1),
    buttonText: "Cerrar"
  });

  modal.createModal();

  document.getElementById("create-ecommerce-form").addEventListener("submit", handleCreateEcommerce);
}

// Contenido de cada paso del formulario
function getStepContent(step) {
  switch(step) {
    case 1:
      return `
        <form id="create-ecommerce-form" data-step="1">
          <h3>Crear un nuevo e-commerce</h3>
          <p>Completa la información básica sobre tu e-commerce, incluyendo el nombre y la URL. Asegúrate de que la URL sea única.</p>
          <label for="nombre">Nombre del E-commerce:</label>
          <input type="text" id="nombre" required />
          
          <label for="url">URL (store.html?tienda=):</label>
          <input type="text" id="url" required placeholder="Ej: tienda123" />
          
          <button type="button" class="fill-data-btn">Llenar Datos de Prueba</button>
          <button type="submit">Siguiente</button>
        </form>
      `;
    case 2:
      return `
        <form id="create-ecommerce-form" data-step="2">
          <h3>Detalles adicionales</h3>
          <p>Proporciona una breve descripción, dirección y tus datos de contacto.</p>
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" required></textarea>

          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" required />

          <label for="telefono">Teléfono:</label>
          <input type="text" id="telefono" required />

          <label for="whatsapp">WhatsApp:</label>
          <input type="text" id="whatsapp" required />

          <button type="button" class="fill-data-btn">Llenar Datos de Prueba</button>
          <button type="submit">Siguiente</button>
        </form>
      `;
    case 3:
      return `
        <form id="create-ecommerce-form" data-step="3">
          <h3>Conecta tus redes sociales</h3>
          <p>Añade tus redes sociales para que los clientes puedan seguirte y contactarte fácilmente.</p>
          <div id="social-media-container">
            <div>
              <input type="text" placeholder="Nombre" required />
              <input type="text" placeholder="URL" required />
            </div>
          </div>
          <button type="button" id="add-social-media-btn">Agregar Red Social</button>
          <button type="button" class="fill-data-btn">Llenar Datos de Prueba</button>
          <button type="submit">Siguiente</button>
        </form>
      `;
    case 4:
      return `
        <form id="create-ecommerce-form" data-step="4">
          <h3>Establece tus horarios</h3>
          <p>Selecciona los días de operación y establece tus horarios de apertura y cierre.</p>
          <div id="horarios-container">
            ${getHorariosHTML()}
          </div>
          <button type="button" class="fill-data-btn">Llenar Datos de Prueba</button>
          <button type="submit">Crear E-commerce</button>
        </form>
      `;
    default:
      return '';
  }
}

// Generar HTML para los horarios
function getHorariosHTML() {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  
  return `
    <table class="horarios-table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Horario Apertura Local</th>
          <th>Horario Cierre Local</th>
          <th>Horario Apertura Envío</th>
          <th>Horario Cierre Envío</th>
        </tr>
      </thead>
      <tbody>
        ${dias.map(dia => `
          <tr>
            <td>${dia}</td>
            <td><input type="time" id="apertura-${dia}" required /></td>
            <td><input type="time" id="cierre-${dia}" required /></td>
            <td><input type="time" id="envio-apertura-${dia}" required /></td>
            <td><input type="time" id="envio-cierre-${dia}" required /></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Función para llenar los datos de prueba
function fillTestData(step) {
  if (step === 1) {
    document.getElementById("nombre").value = "Tienda de Prueba";
    document.getElementById("url").value = "tienda-prueba";
  } else if (step === 2) {
    document.getElementById("descripcion").value = "Descripción de prueba para la tienda.";
    document.getElementById("direccion").value = "Calle Falsa 123";
    document.getElementById("telefono").value = "1234567890";
    document.getElementById("whatsapp").value = "1234567890";
  } else if (step === 4) {
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    dias.forEach(dia => {
      document.getElementById(`apertura-${dia}`).value = "09:00";
      document.getElementById(`cierre-${dia}`).value = "20:00";
      document.getElementById(`envio-apertura-${dia}`).value = "10:00";
      document.getElementById(`envio-cierre-${dia}`).value = "18:00";
    });
  }
}

// Función para manejar la creación de e-commerce
function handleCreateEcommerce(e) {
  e.preventDefault();
  const form = e.target;
  const step = parseInt(form.dataset.step);

  if (step === 1) {
    const nombre = document.getElementById("nombre").value;
    const url = document.getElementById("url").value;
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const urlExists = loggedInUser.ecommerce.some(ecommerce => ecommerce.url === `store.html?tienda=${url}`);
    
    if (urlExists) {
      const alert = new Modal({
        title: "Error",
        message: "La URL ya está en uso. Elige otra.",
        buttonText: "Aceptar"
      });
      alert.createAlert();
      return;
    }

    form.innerHTML = getStepContent(2);
  } else if (step === 2) {
    const descripcion = document.getElementById("descripcion").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const whatsapp = document.getElementById("whatsapp").value;

    form.innerHTML = getStepContent(3);
  } else if (step === 3) {
    const socialMediaEntries = Array.from(document.querySelectorAll("#social-media-container div"));
    const redesSociales = socialMediaEntries.map(entry => {
      const [nombre, url] = entry.children;
      return { nombre: nombre.value, url: url.value };
    });

    form.innerHTML = getStepContent(4);
  } else if (step === 4) {
    const horarios = {};
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    dias.forEach(dia => {
      horarios[dia] = {
        apertura: document.getElementById(`apertura-${dia}`).value,
        cierre: document.getElementById(`cierre-${dia}`).value,
        envioApertura: document.getElementById(`envio-apertura-${dia}`).value,
        envioCierre: document.getElementById(`envio-cierre-${dia}`).value,
      };
    });

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    loggedInUser.ecommerce.push({
      nombre: document.getElementById("nombre").value,
      url: `store.html?tienda=${document.getElementById("url").value}`,
      descripcion: document.getElementById("descripcion").value,
      direccion: document.getElementById("direccion").value,
      telefono: document.getElementById("telefono").value,
      whatsapp: document.getElementById("whatsapp").value,
      redesSociales: redesSociales,
      horarios: horarios,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    const alert = new Modal({
      title: "Éxito",
      message: "Tu e-commerce ha sido creado exitosamente.",
      buttonText: "Aceptar"
    });
    alert.createAlert();
  }
}

// Agregar evento al botón de "Llenar Datos de Prueba"
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("fill-data-btn")) {
    const step = parseInt(e.target.closest("form").dataset.step);
    fillTestData(step);
  }
});
