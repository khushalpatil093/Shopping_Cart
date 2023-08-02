// script.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      
      // Get user input values
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
  
      // Validate user input (You may add more validation as per your requirement)
      if (email.trim() === '' || password.trim() === '') {
        alert('Please enter both email and password.');
        return;
      }
  
      // Check if the user exists in local storage (assuming you have stored user data with key 'users')
      const usersData = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = usersData.find(user => user.email === email && user.password === password);
  
      if (foundUser) {
        // User found, redirect to the shop page (replace with your desired page)
        window.location.href = '/shop/index.html';
      } else {
        alert('Invalid email or password. Please try again.');
      }
    });
  });
  