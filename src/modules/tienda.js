// tienda.js

// Función para inicializar la tienda
const initTienda = () => {
    const section = document.getElementById('loadTienda');
    const tiendaID = new URLSearchParams(window.location.search).get('tienda');
  
    if (section) {
      const empresas = JSON.parse(localStorage.getItem('empresas'));
      const productos = JSON.parse(localStorage.getItem('productos'));
  
      const empresa = empresas[tiendaID];
  
      section.innerHTML = `
        <h2>${empresa.nombre}</h2>
        <p>${empresa.direccion}</p>
        <div id="productList">
          <h3>Productos</h3>
        </div>
      `;
  
      const productList = document.getElementById('productList');
  
      empresa.productos.forEach(productoId => {
        const producto = productos[productoId];
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p>${producto.descripcion}</p>
          <p>Precio: $${producto.precio}</p>
        `;
        productList.appendChild(productDiv);
      });
    }
  };
  
  // Iniciar el módulo de la tienda
  initTienda();
  