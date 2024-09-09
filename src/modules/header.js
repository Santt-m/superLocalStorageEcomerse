// src/modules/header.js
export function initHeader() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const userLink = document.getElementById('user-link');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (loggedInUser) {
      userLink.style.display = 'block';
    } else {
      userLink.style.display = 'none';
    }
  
    menuToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
      }
    });
  }
  