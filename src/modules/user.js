// src/modules/user.js
function createStore() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const storeName = prompt('Escribe el nombre de tu tienda:');
  if (storeName) {
    let stores = JSON.parse(localStorage.getItem('stores')) || [];

    if (stores.find(s => s.name === storeName)) {
      alert('Este nombre de tienda ya está en uso.');
    } else {
      const newStore = { owner: user.email, name: storeName, products: [] };
      stores.push(newStore);
      localStorage.setItem('stores', JSON.stringify(stores));

      document.getElementById('storeLink').textContent = `store.html?store=${storeName}`;
      const storeSection = document.getElementById('storeSection');
      storeSection.style.display = 'flex'; // Usamos flex para hacer visible
      alert('Tienda creada con éxito');
    }
  }
}

function loadUserStore() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const stores = JSON.parse(localStorage.getItem('stores')) || [];
  const userStore = stores.find(store => store.owner === user.email);

  if (userStore) {
    document.getElementById('storeLink').textContent = `store.html?store=${userStore.name}`;
    const storeSection = document.getElementById('storeSection');
    storeSection.style.display = 'flex'; // Usamos flex para hacer visible
  }
}

export function initUser() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    alert('Por favor, inicia sesión primero.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('username').textContent = user.username;

  const createStoreBtn = document.getElementById('createStore');
  if (createStoreBtn) {
    createStoreBtn.addEventListener('click', createStore);
  }

  loadUserStore();
  console.log("Módulo de usuario cargado.");
}
