# Proyecto E-commerce con localStorage

Este es un proyecto de e-commerce donde los usuarios pueden registrarse, iniciar sesión, crear sus propias empresas, gestionar productos y visualizar sus tiendas personalizadas. Los datos se almacenan en `localStorage`.

## Funcionalidades

### Registro de Usuario
- Los usuarios pueden registrarse proporcionando un **nombre de usuario**, **correo electrónico** y **contraseña**.
- Los datos se almacenan en **localStorage**.
- Cada usuario tiene un **ID único**, una **imagen de perfil** por defecto y un array de **empresas**.

### Inicio de Sesión (Login)
- Los usuarios pueden iniciar sesión proporcionando su **correo electrónico** y **contraseña**.
- Al iniciar sesión correctamente, se guarda la sesión del usuario en **localStorage** bajo la clave `loggedInUser`.
- Redirige a la página de **Mi cuenta** tras iniciar sesión correctamente.

### Página de Usuario
- Los usuarios pueden ver su **perfil** y las **empresas** que han creado.
- Pueden crear múltiples **empresas** y gestionarlas.
- Cada empresa tiene sus propios datos, incluyendo el **nombre**, **dirección**, **redes sociales**, **horarios** y **productos**.

### Gestión de Empresas
- Los usuarios pueden crear y gestionar varias empresas.
- Los datos de la empresa incluyen:
  - **Nombre de la empresa**
  - **Descripción**
  - **Dirección**
  - **Teléfono y número de WhatsApp**
  - **Logo de la empresa**
  - **Imagen de fondo de la tienda**
  - **Redes sociales**
  - **Horarios de apertura y envío**
  - **Productos de la empresa**
- Cada empresa tiene una URL personalizada (`store.html?empresa-nombre`).

### Gestión de Productos
- Las empresas pueden agregar **productos** a su catálogo.
- Cada producto tiene:
  - **Nombre**
  - **Descripción**
  - **Precio**
  - **Imagen**
  - **Tipo de producto** (comida, bebida, etc.)
  - Si está en promoción
  - Si contiene alcohol o no

### Navegación y Menú Responsive
- El `header` se genera dinámicamente y su contenido varía según si el usuario está logueado o no.
- En vista móvil, el menú se despliega con un botón de menú tipo "hamburguesa", que se convierte en una "X" al abrirse.
- El usuario logueado verá un ícono de perfil circular con su imagen, mientras que los no logueados verán las opciones de **Iniciar sesión** y **Registro**.

## Estructura de la Base de Datos

### Usuarios (localStorage - `users`)
Cada usuario es almacenado en el array `users` de **localStorage**, con la siguiente estructura:

```json
{
  "id": 1,
  "username": "usuario1",
  "email": "usuario1@correo.com",
  "password": "hashedpassword1",
  "profileImage": "./path-to-profile-image.jpg",
  "empresas": [...]
}
