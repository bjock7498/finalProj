document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const loginErrorElement = document.getElementById('login-error');
  
    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.dataset.item;
        const price = parseFloat(button.dataset.price);
  
        cart.push({ item, price });
        cartCountElement.textContent = cart.length;
        alert(`${item} added to cart!`);
      });
    });
  
    // Login functionality
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        if (username === "customer" && password === "1234") {
          alert("Welcome, Customer!");
          window.location.href = "TestProj-Login.html";
        } else if (username === "manager" && password === "admin") {
          alert("Welcome, Manager!");
          window.location.href = "index.html";
        } else {
          alert("Invalid credentials, try again.")
          loginErrorElement.style.display = "block";
        }
      });
    }
  });
  