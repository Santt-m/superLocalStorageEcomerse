// src/modules/register.js
export function initRegister() {
  const registerForm = document.getElementById('registerForm');
  
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      profileImage: './path-to-default-profile-image.jpg',
      empresas: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registro exitoso');
    window.location.href = 'login.html';
  });
}
