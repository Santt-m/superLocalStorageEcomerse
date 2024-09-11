export function renderSection(mainContent) {
    const stockSection = document.createElement('section');
    stockSection.id = 'stock-section';
    stockSection.classList.add('service-section');
    stockSection.innerHTML = `
      <h3>Stock</h3>
      <p>Aquí se gestionan los productos en stock.</p>
    `;
    mainContent.appendChild(stockSection);
  }
  