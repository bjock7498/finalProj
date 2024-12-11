document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-items');
  
  // Fetch menu items from the API
  fetch('/api/menu-items')
    .then(response => response.json())
    .then(menuItems => {
      // Dynamically render the menu items
      menuContainer.innerHTML = menuItems
        .map(
          (item) => `
          <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-price">$${item.price.toFixed(2)}</p>
            <button 
              class="add-to-cart" 
              data-item="${item.name}" 
              data-price="${item.price}" 
              data-image="${item.image}" 
              data-id="${item.id}"
            >
              Add to Cart
            </button>
          </div>`
        )
        .join("");
    })
    .catch(error => {
      console.error('Error fetching menu items:', error);
      menuContainer.innerHTML = '<p>Failed to load menu items.</p>';
    });

  // Update cart count
  const cartCountElement = document.getElementById('cart-count');
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.textContent = cart.length;
  }

  // Add to Cart functionality
  menuContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const name = e.target.dataset.item;
      const price = parseFloat(e.target.dataset.price);
      const image = e.target.dataset.image;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    }
  });

  // Initial cart count update
  updateCartCount();
});

// Cart handling
document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout-button');

  function renderCart() {
    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalElement.textContent = '0.00';
      checkoutButton.disabled = true;
      return;
    }

    cartItemsElement.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <label for="quantity-${index}">Quantity:</label>
          <input type="number" id="quantity-${index}" min="1" value="${item.quantity}" data-index="${index}" class="cart-quantity-input">
          <button class="remove-item-button" data-index="${index}">Remove</button>
        </div>
      </div>
    `).join('');

    updateCartTotal();
  }

  function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toFixed(2);
  }

  // Event listener for quantity changes
  cartItemsElement.addEventListener('change', (e) => {
    if (e.target.classList.contains('cart-quantity-input')) {
      const index = e.target.getAttribute('data-index');
      const newQuantity = parseInt(e.target.value);

      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
      }
    }
  });

  // Event listener for removing items
  cartItemsElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-button')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  });

  // Initial render of the cart
  renderCart();
});
