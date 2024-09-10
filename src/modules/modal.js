// src/modules/modal.js

export function createModal(content, title = '', footerButtons = []) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
  
    // Crear la cabecera del modal con el título y la "X" para cerrar
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
  
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;
    modalHeader.appendChild(modalTitle);
  
    const closeIcon = document.createElement('span');
    closeIcon.textContent = '✖';
    closeIcon.classList.add('modal-close-icon');
    closeIcon.addEventListener('click', () => {
      document.body.removeChild(modalOverlay);
    });
  
    modalHeader.appendChild(closeIcon);
    modalContent.appendChild(modalHeader);
  
    // Añadir el contenido del modal
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = content;
    modalContent.appendChild(modalBody);
  
    // Crear pie de página para los botones del modal
    if (footerButtons.length > 0) {
      const modalFooter = document.createElement('div');
      modalFooter.classList.add('modal-footer');
  
      footerButtons.forEach(button => {
        const modalButton = document.createElement('button');
        modalButton.textContent = button.text;
        modalButton.classList.add(button.class || 'btn');
        modalButton.addEventListener('click', button.onClick || (() => {}));
        modalFooter.appendChild(modalButton);
      });
  
      modalContent.appendChild(modalFooter);
    }
  
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }
  
  // Función para crear un alert que se cierre automáticamente
  export function createAlert(content, timeout = 3000) {
    const alertOverlay = document.createElement('div');
    alertOverlay.classList.add('alert-overlay');
  
    const alertContent = document.createElement('div');
    alertContent.classList.add('alert-content');
    alertContent.innerHTML = content;
  
    alertOverlay.appendChild(alertContent);
    document.body.appendChild(alertOverlay);
  
    // Cerrar automáticamente después del tiempo especificado
    setTimeout(() => {
      document.body.removeChild(alertOverlay);
    }, timeout);
  }
  