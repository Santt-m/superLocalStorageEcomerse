/* ejemplos de uso:

** como crear un modal:

createModal('html a mostrar en el modal','titulo del modal', [{text: 'boton ejemplo', action: () => });

** como crear un alert:

// Alert de éxito (verde)
createAlert('¡Acción completada con éxito!', 3000, 'success');

// Alert de error (rojo)
createAlert('Ha ocurrido un error', 3000, 'error');

// Alert de advertencia (amarillo)
createAlert('Atención: Hay un problema', 3000, 'warning');

// Alert por defecto (negro)
createAlert('Este es un mensaje por defecto', 3000);

*/


// Crear el contenedor de alertas si no existe
function createAlertContainer() {
  let alertContainer = document.querySelector('.alert-container');
  if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.classList.add('alert-container');
      document.body.appendChild(alertContainer);
  }
  return alertContainer;
}

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
export function createAlert(content, timeout = 3000, type = 'default') {
  const alertContainer = createAlertContainer();  // Usar el contenedor de alertas
  
  const alertOverlay = document.createElement('div');
  alertOverlay.classList.add('alert-overlay', `alert-${type}`);  // Agregar clase según el tipo
  
  const alertContent = document.createElement('div');
  alertContent.classList.add('alert-content');
  alertContent.innerHTML = content;
  
  alertOverlay.appendChild(alertContent);
  alertContainer.appendChild(alertOverlay);
  
  // Cerrar automáticamente después del tiempo especificado
  setTimeout(() => {
      if (alertOverlay) {
          alertOverlay.style.opacity = 0;
          setTimeout(() => {
              alertContainer.removeChild(alertOverlay);
          }, 1000);
      }
  }, timeout);
}