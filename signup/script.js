// script.js
document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
  
    signUpForm.addEventListener('submit', event => {
      event.preventDefault();
  
      // Get user input values
      const firstName = document.querySelector('input[placeholder="First Name"]').value;
      const lastName = document.querySelector('input[placeholder="Last Name"]').value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const password = document.querySelector('input[placeholder="Password"]').value;
      const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;
  
      // Validate user input (You may add more validation as per your requirement)
      if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('Please fill all the required fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }
  
      // Check if the user already exists in local storage (assuming you have stored user data with key 'users')
      const usersData = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = usersData.find(user => user.email === email);
  
      if (foundUser) {
        alert('An account with this email already exists. Please use a different email.');
        return;
      }
  
      // Create a new user object and add it to the usersData array
      const newUser = {
        firstName,
        lastName,
        email,
        password
      };
      usersData.push(newUser);
  
      // Save the updated usersData array back to local storage
      localStorage.setItem('users', JSON.stringify(usersData));
  
      // Redirect the user to the login page (you can replace this with your desired page)
      window.location.href = '/login/index.html';
    });
  });
  