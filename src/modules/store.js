// src/modules/store.js
function loadStore() {
  const params = new URLSearchParams(window.location.search);
  const storeName = params.get('store');

  if (!storeName) {
    alert('Tienda no especificada');
    window.location.href = 'index.html';
    return;
  }

  const stores = JSON.parse(localStorage.getItem('stores')) || [];
  const store = stores.find(s => s.name === storeName);

  if (store) {
    document.getElementById('storeName').textContent = `Tienda: ${store.name}`;
    store.products.forEach(product => {
      const productElem = document.createElement('div');
      productElem.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p><p>Precio: $${product.price}</p>`;
      document.getElementById('storeContent').appendChild(productElem);
    });
  } else {
    alert('Tienda no encontrada');
    window.location.href = 'error.html';
  }
}

export function initStore() {
  loadStore();
  console.log("Módulo de tienda cargado.");
}
