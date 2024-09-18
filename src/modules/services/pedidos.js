export function renderSection(mainContent) {
    const pedidosSection = document.createElement('section');
    pedidosSection.id = 'pedidos-section';
    pedidosSection.classList.add('service-section');
    pedidosSection.innerHTML = `
      <h3>Pedidos</h3>
      <p>Aquí se gestionan los pedidos.</p>
    `;
    mainContent.appendChild(pedidosSection);
  }
  