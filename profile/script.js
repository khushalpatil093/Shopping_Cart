// script.js
document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  const passwordForm = document.getElementById('passwordForm');

  // Retrieve user data from local storage and pre-fill the profile form
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  if (userData) {
    document.querySelector('input[placeholder="First Name"]').value = userData.firstName;
    document.querySelector('input[placeholder="Last Name"]').value = userData.lastName;
  }

  // Handle profile form submission
  profileForm.addEventListener('submit', event => {
    event.preventDefault();

    // Get user input values
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;

    // Update the user's data in local storage
    if (userData) {
      userData.firstName = firstName;
      userData.lastName = lastName;
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    // You may show a success message or redirect the user to another page after saving the information.
  });

  // Handle password form submission
  passwordForm.addEventListener('submit', event => {
    event.preventDefault();

    // Get user input values
    const oldPassword = document.querySelector('input[placeholder="Old Password"]').value;
    const newPassword = document.querySelector('input[placeholder="New Password"]').value;
    const confirmNewPassword = document.querySelector('input[placeholder="Confirm New Password"]').value;

    // Validate user input (You may add more validation as per your requirement)
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm new password do not match. Please try again.');
      return;
    }

    // Update the user's password in local storage
    if (userData && userData.password === oldPassword) {
      userData.password = newPassword;
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // You may show a success message or redirect the user to another page after changing the password.
    } else {
      alert('Incorrect old password. Please try again.');
    }
  });

  // Handle logout button click
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    // Remove the currentUser from local storage to logout the user
    localStorage.removeItem('currentUser');
    // Redirect the user to the login page after logout (replace with your desired page)
    window.location.href = '/login/index.html';
  });
});
