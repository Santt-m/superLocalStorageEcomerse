import Modal from "../modal.js";

// Función para renderizar la sección de empresas
export function renderSection(section) {
  renderCompaniesSection(section);
}

// Función para renderizar la lista de empresas del usuario
export function renderCompaniesSection(section) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser.empresas) {
    const modal = new Modal({
      title: "Advertencia",
      message: "No tienes empresas registradas en tu cuenta.",
      buttonText: "Crear Array de Empresas",
      onClose: () => {
        loggedInUser.empresas = [];
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        renderCompaniesSection(section);
      }
    });
    modal.createAlert();
    return;
  }

  section.innerHTML = `
    <h2>Empresas</h2>
    <div id="company-list" role="region" aria-label="Lista de empresas">
      ${loggedInUser.empresas.length === 0
        ? `<p>No tienes empresas registradas.</p>`
        : loggedInUser.empresas.map((empresa, index) => `
            <div class="company-card" tabindex="0" role="article" aria-labelledby="empresa-${index}-nombre">
              <h3 id="empresa-${index}-nombre">${empresa.nombreEmpresa}</h3>
              <p><strong>Descripción:</strong> ${empresa.descripcion}</p>
              <p><strong>Dirección:</strong> ${empresa.direccion}</p>
              <p><strong>Teléfono:</strong> ${empresa.telefono}</p>
              <p><strong>WhatsApp:</strong> ${empresa.whatsapp}</p>
              <img src="${empresa.logo}" alt="Logo de ${empresa.nombreEmpresa}" class="company-logo"/>
              <div class="company-actions">
                <button class="btn btn-view-company" data-index="${index}" aria-label="Ver detalles de ${empresa.nombreEmpresa}">Ver</button>
                <button class="btn btn-view-products" data-index="${index}" aria-label="Ver productos de ${empresa.nombreEmpresa}">Productos</button>
              </div>
            </div>
          `).join('')}
    </div>
    <button id="create-company-btn" class="btn btn-create" aria-label="Crear nueva empresa">Crear Nueva Empresa</button>
  `;

  // Evento para crear una nueva empresa
  document.getElementById("create-company-btn").addEventListener("click", openCreateCompanyModal);

  // Eventos para los botones de "Ver" y "Productos" en cada card de empresa
  document.querySelectorAll(".btn-view-company").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      openEditCompanyModal(section, index);
    });
  });

  document.querySelectorAll(".btn-view-products").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      renderProductList(section, index);
    });
  });
}

// Función para abrir el modal de creación de empresas
function openCreateCompanyModal() {
  const modal = new Modal({
    title: "Crear Nueva Empresa",
    content: `
      <form id="create-company-form">
        <label for="nombreEmpresa">Nombre de la Empresa:</label>
        <input type="text" id="nombreEmpresa" required />
        
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" required></textarea>

        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" required />
        
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" required />

        <label for="whatsapp">WhatsApp:</label>
        <input type="text" id="whatsapp" required />

        <label for="logo">Logo de la Empresa (URL):</label>
        <input type="text" id="logo" required />
        
        <label for="imagenFondo">Imagen de Fondo (URL):</label>
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

// Función para abrir el modal de editar empresa
function openEditCompanyModal(section, companyIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const empresa = loggedInUser.empresas[companyIndex];

  const modal = new Modal({
    title: `Editar Empresa: ${empresa.nombreEmpresa}`,
    content: `
      <form id="edit-company-form">
        <label for="nombreEmpresa">Nombre de la Empresa:</label>
        <input type="text" id="nombreEmpresa" value="${empresa.nombreEmpresa}" required />
        
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion">${empresa.descripcion}</textarea>

        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" value="${empresa.direccion}" required />
        
        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" value="${empresa.telefono}" required />

        <label for="whatsapp">WhatsApp:</label>
        <input type="text" id="whatsapp" value="${empresa.whatsapp}" required />

        <label for="logo">Logo de la Empresa (URL):</label>
        <input type="text" id="logo" value="${empresa.logo}" required />
        
        <label for="imagenFondo">Imagen de Fondo (URL):</label>
        <input type="text" id="imagenFondo" value="${empresa.imagenFondo}" required />

        <button type="submit">Guardar Cambios</button>
      </form>
    `,
    buttonText: "Cerrar"
  });

  modal.createModal();

  // Añadir el evento al formulario de edición
  document.getElementById("edit-company-form").addEventListener("submit", (e) => {
    e.preventDefault();
    saveEditedCompany(section, companyIndex);
  });
}

// Función para guardar los cambios de la empresa
function saveEditedCompany(section, companyIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Actualizamos la empresa con los nuevos valores
  loggedInUser.empresas[companyIndex] = {
    ...loggedInUser.empresas[companyIndex],
    nombreEmpresa: document.getElementById("nombreEmpresa").value,
    descripcion: document.getElementById("descripcion").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    whatsapp: document.getElementById("whatsapp").value,
    logo: document.getElementById("logo").value,
    imagenFondo: document.getElementById("imagenFondo").value
  };

  // Guardamos los cambios en localStorage
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  // Mostramos alerta de éxito
  const alert = new Modal({
    message: `Empresa ${loggedInUser.empresas[companyIndex].nombreEmpresa} editada exitosamente.`,
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  // Volvemos a renderizar la lista de empresas
  renderCompaniesSection(section);
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

    socialEntry.querySelector(".remove-social-media-btn").addEventListener("click", () => {
      socialEntry.remove();
    });
  });
}

// Función para renderizar la lista de productos
function renderProductList(section, companyIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const company = loggedInUser.empresas[companyIndex];

  const productListHTML = company.productos.length === 0
    ? `<p>No hay productos registrados.</p>`
    : company.productos.map((producto, productIndex) => `
        <div class="product-card">
          <h4>${producto.name}</h4>
          <p><strong>Descripción:</strong> ${producto.description}</p>
          <p><strong>Tipo:</strong> ${producto.type}</p>
          <p><strong>Tags:</strong> ${producto.tag.join(', ')}</p>
          <p><strong>Precio:</strong> $${producto.price}</p>
          <p><strong>Promoción:</strong> ${producto.promo ? 'Sí' : 'No'}</p>
          <p><strong>Alcohólico:</strong> ${producto.alcoholic ? 'Sí' : 'No'}</p>
          <img src="${producto.image}" alt="${producto.name}" class="product-image"/>
          <div class="product-actions">
            <button class="btn btn-edit-product" data-company-index="${companyIndex}" data-product-index="${productIndex}" aria-label="Editar ${producto.name}">Editar</button>
            <button class="btn btn-delete-product" data-company-index="${companyIndex}" data-product-index="${productIndex}" aria-label="Eliminar ${producto.name}">Eliminar</button>
          </div>
        </div>
      `).join('');

  section.innerHTML = `
    <h2>Productos de la Empresa: ${company.nombreEmpresa}</h2>
    <div id="product-list">${productListHTML}</div>
    <button id="add-product-btn" class="btn btn-add" aria-label="Agregar producto a ${company.nombreEmpresa}">Agregar Producto</button>
    <button id="back-to-companies-btn" class="btn btn-back">Volver a Empresas</button>
  `;

  // Evento para volver a la lista de empresas
  document.getElementById("back-to-companies-btn").addEventListener("click", () => {
    renderCompaniesSection(section);
  });

  // Evento para agregar un nuevo producto
  document.getElementById("add-product-btn").addEventListener("click", () => {
    openAddProductModal(companyIndex);
  });

  // Eventos para editar y eliminar productos
  document.querySelectorAll(".btn-edit-product").forEach(button => {
    button.addEventListener("click", (e) => {
      const companyIndex = e.target.getAttribute("data-company-index");
      const productIndex = e.target.getAttribute("data-product-index");
      openEditProductModal(companyIndex, productIndex);
    });
  });

  document.querySelectorAll(".btn-delete-product").forEach(button => {
    button.addEventListener("click", (e) => {
      const companyIndex = e.target.getAttribute("data-company-index");
      const productIndex = e.target.getAttribute("data-product-index");
      deleteProduct(companyIndex, productIndex);
    });
  });
}

// Función para abrir el modal de agregar producto
function openAddProductModal(companyIndex) {
  const modal = new Modal({
    title: "Agregar Producto",
    content: `
      <form id="add-product-form">
        <label for="name">Nombre del Producto:</label>
        <input type="text" id="name" required />
        
        <label for="type">Tipo de Producto:</label>
        <input type="text" id="type" required />
        
        <label for="tag">Tags (separados por comas):</label>
        <input type="text" id="tag" required />
        
        <label for="description">Descripción:</label>
        <textarea id="description" required></textarea>
        
        <label for="price">Precio:</label>
        <input type="number" id="price" required />
        
        <label for="image">Imagen (URL):</label>
        <input type="text" id="image" required />
        
        <label for="promo">¿Producto en promoción?</label>
        <input type="checkbox" id="promo" />
        
        <label for="alcoholic">¿Producto alcohólico?</label>
        <input type="checkbox" id="alcoholic" />
        
        <button type="submit">Agregar Producto</button>
      </form>
    `,
    buttonText: "Cerrar"
  });

  modal.createModal();

  document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct(companyIndex);
  });
}

// Función para agregar producto a la empresa
function addProduct(companyIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const newProduct = {
    id: Date.now(), // Genera un ID único basado en la fecha actual
    type: document.getElementById("type").value,
    tag: document.getElementById("tag").value.split(',').map(tag => tag.trim()),
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    image: document.getElementById("image").value,
    promo: document.getElementById("promo").checked,
    alcoholic: document.getElementById("alcoholic").checked
  };

  loggedInUser.empresas[companyIndex].productos.push(newProduct);
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  const alert = new Modal({
    message: "Producto agregado exitosamente.",
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  renderProductList(document.querySelector("section"), companyIndex);
}

// Función para eliminar un producto
function deleteProduct(companyIndex, productIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const productName = loggedInUser.empresas[companyIndex].productos[productIndex].name;
  loggedInUser.empresas[companyIndex].productos.splice(productIndex, 1);
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  const alert = new Modal({
    message: `Producto "${productName}" eliminado exitosamente.`,
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  renderProductList(document.querySelector("section"), companyIndex);
}

// Función para abrir el modal de editar producto
function openEditProductModal(companyIndex, productIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const product = loggedInUser.empresas[companyIndex].productos[productIndex];

  const modal = new Modal({
    title: `Editar Producto: ${product.name}`,
    content: `
      <form id="edit-product-form">
        <label for="name">Nombre del Producto:</label>
        <input type="text" id="name" value="${product.name}" required />
        
        <label for="type">Tipo de Producto:</label>
        <input type="text" id="type" value="${product.type}" required />
        
        <label for="tag">Tags (separados por comas):</label>
        <input type="text" id="tag" value="${product.tag.join(', ')}" required />
        
        <label for="description">Descripción:</label>
        <textarea id="description" required>${product.description}</textarea>
        
        <label for="price">Precio:</label>
        <input type="number" id="price" value="${product.price}" required />
        
        <label for="image">Imagen (URL):</label>
        <input type="text" id="image" value="${product.image}" required />
        
        <label for="promo">¿Producto en promoción?</label>
        <input type="checkbox" id="promo" ${product.promo ? 'checked' : ''} />
        
        <label for="alcoholic">¿Producto alcohólico?</label>
        <input type="checkbox" id="alcoholic" ${product.alcoholic ? 'checked' : ''} />
        
        <button type="submit">Guardar Cambios</button>
      </form>
    `,
    buttonText: "Cerrar"
  });

  modal.createModal();

  // Añadir el evento al formulario de edición
  document.getElementById("edit-product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    editProduct(companyIndex, productIndex);
  });
}

// Función para editar producto
function editProduct(companyIndex, productIndex) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const product = loggedInUser.empresas[companyIndex].productos[productIndex];

  const updatedProduct = {
    id: product.id, // Mantener el mismo ID
    type: document.getElementById("type").value,
    tag: document.getElementById("tag").value.split(',').map(tag => tag.trim()),
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    image: document.getElementById("image").value,
    promo: document.getElementById("promo").checked,
    alcoholic: document.getElementById("alcoholic").checked
  };

  // Actualizar el producto en el array
  loggedInUser.empresas[companyIndex].productos[productIndex] = updatedProduct;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  // Mostrar alerta de éxito
  const alert = new Modal({
    message: `Producto "${updatedProduct.name}" editado exitosamente.`,
    buttonText: "Aceptar",
    type: "success"
  });
  alert.createAlert();

  // Volver a renderizar la lista de productos
  renderProductList(document.querySelector("section"), companyIndex);
}
