function toggleForm(formType) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');

  if (formType === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginErrorElement = document.getElementById('loginErrorElement');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const username = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const credentials = [
        { username: "customer@email.com", password: "1234", role: "customer", redirectUrl: "TestProj-cart.html" },
        { username: "manager@shamrock.com", password: "1234!", role: "admin", redirectUrl: "TestProj-Menu.html" }
      ];

      const user = credentials.find(
        (cred) => cred.username === username && cred.password === password
      );

      if (user) {
        alert(`Welcome, ${capitalizeFirstLetter(user.role)}!`);
        window.location.href = "TestProj-cart.html";
        localStorage.setItem('loggedInUser', user.role);

        if (user.redirectUrl) {
          window.location.href = user.redirectUrl;
        }
        if (user.role === "admin") {
          window.location.href = user.redirectUrl;
        }
      } else {
        displayLoginError();
      }
    });
  }

  function displayLoginError() {
    if (loginErrorElement) {
      loginErrorElement.style.display = "block";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
