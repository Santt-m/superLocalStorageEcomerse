// editCompany.js

export const initEditCompany = (empresaId) => {
  const section = document.getElementById('loadEditCompany');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const empresa = currentUser.empresas.find(e => e.empresaID === empresaId);

  if (section && empresa) {
    section.innerHTML = `
      <h2>Editando ${empresa.nombre}</h2>
      <form id="editCompanyForm">
        <label for="editCompanyName">Nombre de la Empresa:</label>
        <input type="text" id="editCompanyName" value="${empresa.nombre}" required />
        
        <label for="editCompanyAddress">Dirección de la Empresa:</label>
        <input type="text" id="editCompanyAddress" value="${empresa.direccion}" required />
        
        <button type="submit">Guardar Cambios</button>
      </form>

      <h3>Productos de la Empresa</h3>
      <div id="productList">
        <!-- Aquí se listarán los productos -->
      </div>
      <button id="addProduct">Agregar Producto</button>
      <div id="editProductSection"></div>
    `;

    const editCompanyForm = document.getElementById('editCompanyForm');
    editCompanyForm.addEventListener('submit', (event) => handleEditCompany(event, empresaId));

    const addProductButton = document.getElementById('addProduct');
    addProductButton.addEventListener('click', () => addProduct(empresaId));

    listProducts(empresa.productos);
  }
};

// Función para manejar la edición de la empresa
const handleEditCompany = (event, empresaId) => {
  event.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const empresa = currentUser.empresas.find(e => e.empresaID === empresaId);

  empresa.nombre = document.getElementById('editCompanyName').value;
  empresa.direccion = document.getElementById('editCompanyAddress').value;

  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  alert('Empresa actualizada exitosamente');
};

// Función para listar los productos de la empresa
const listProducts = (productos) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  productos.forEach(producto => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio}</p>
      <button id="editProduct-${producto.productoID}">Editar</button>
    `;
    productDiv.querySelector(`#editProduct-${producto.productoID}`).addEventListener('click', () => loadEditProductSection(producto.productoID));
    productList.appendChild(productDiv);
  });
};

// Función para cargar la sección de edición del producto
const loadEditProductSection = (productoId) => {
  const editProductSection = document.getElementById('editProductSection');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const empresa = currentUser.empresas.find(e => e.productos.some(p => p.productoID === productoId));
  const producto = empresa.productos.find(p => p.productoID === productoId);

  editProductSection.innerHTML = `
    <h3>Editando ${producto.nombre}</h3>
    <form id="editProductForm">
      <label for="editProductName">Nombre del Producto:</label>
      <input type="text" id="editProductName" value="${producto.nombre}" required />
      
      <label for="editProductDescription">Descripción:</label>
      <textarea id="editProductDescription" required>${producto.descripcion}</textarea>
      
      <label for="editProductPrice">Precio:</label>
      <input type="number" id="editProductPrice" value="${producto.precio}" required />
      
      <button type="submit">Guardar Cambios</button>
    </form>
  `;

  const editProductForm = document.getElementById('editProductForm');
  editProductForm.addEventListener('submit', (event) => handleEditProduct(event, productoId));
};

// Función para manejar la edición del producto
const handleEditProduct = (event, productoId) => {
  event.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const empresa = currentUser.empresas.find(e => e.productos.some(p => p.productoID === productoId));
  const producto = empresa.productos.find(p => p.productoID === productoId);

  producto.nombre = document.getElementById('editProductName').value;
  producto.descripcion = document.getElementById('editProductDescription').value;
  producto.precio = parseFloat(document.getElementById('editProductPrice').value);

  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  alert('Producto actualizado exitosamente');
};

// Función para agregar un nuevo producto a la empresa
const addProduct = (empresaId) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const empresa = currentUser.empresas.find(e => e.empresaID === empresaId);

  const newProductId = `productoID${Date.now()}`;

  const newProduct = {
    productoID: newProductId,
    nombre: `Nuevo Producto ${Date.now()}`,
    descripcion: 'Descripción del nuevo producto',
    precio: 0.0,
    empresa: empresaId
  };

  empresa.productos.push(newProduct);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  listProducts(empresa.productos);

  alert('Producto agregado exitosamente');
};
