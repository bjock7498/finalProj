document.addEventListener('DOMContentLoaded', () => {
  // Manager Login Credentials
  const managerCredentials = {
    username: "manager",
    password: "password123"
  };

  // Login Form Logic
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const loginMessage = document.getElementById('login-message');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === managerCredentials.username && password === managerCredentials.password) {
        localStorage.setItem('managerLoggedIn', 'true');
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful!";
        setTimeout(() => {
          window.location.href = "manager-dashboard.html";
        }, 1000);
      } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password.";
      }
    });
  }

  // Dashboard Access Check
  if (document.body.classList.contains('dashboard')) {
    if (localStorage.getItem('managerLoggedIn') !== 'true') {
      alert('Access denied. Please log in as a manager.');
      window.location.href = 'manager-login.html';
    }
  }

  // Logout Button Logic
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('managerLoggedIn');
      alert('You have been logged out.');
      window.location.href = 'manager-login.html';
    });
  }
});

// Inside script.js
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate credentials
    if (username === managerCredentials.username && password === managerCredentials.password) {
      localStorage.setItem('managerLoggedIn', 'true'); // Save login status
      const loginMessage = document.getElementById('login-message');
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful!";
      setTimeout(() => {
        window.location.href = "manager-dashboard.html"; // Redirect to dashboard
      }, 1000); // Delay for better user experience
    } else {
      const loginMessage = document.getElementById('login-message');
      loginMessage.style.color = "red";
      loginMessage.textContent = "Invalid username or password.";
    }
  });
}

// Control visibility of Dashboard link
document.addEventListener('DOMContentLoaded', () => {
  const dashboardLink = document.getElementById('dashboard-link');
  if (localStorage.getItem('managerLoggedIn') === 'true') {
    dashboardLink.style.display = "block"; // Show dashboard link
  }
});
