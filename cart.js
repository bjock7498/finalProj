
document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsElement = document.getElementById('cart-items');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  const cartTotalElement = document.getElementById('cart-total');
  const promoDiscountElement = document.getElementById('promo-discount');
  const promoCodeInput = document.getElementById('promo-code');
  const applyPromoButton = document.getElementById('apply-promo');
  const checkoutButton = document.getElementById('checkout-button');
  let promoDiscount = 0;

  // Update cart count
  function updateCartCount() {
    cartCountElement.textContent = cart.length;
  }


  // Render cart items
  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
      checkoutButton.disabled = true;
      return;
    }

    cartItemsElement.innerHTML = cart
      .map(
        (item, index,) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">$${item.price.toFixed(2)}</span>
              <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cart-quantity">
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>`
      )
      .join("");

    checkoutButton.disabled = false;
  }
  var total;
  var subtotal
  // Calculate total
  function calculateTotal() {
    subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total = subtotal - promoDiscount;

    cartSubtotalElement.textContent = subtotal.toFixed(2);
    cartTotalElement.textContent = total.toFixed(2);
    promoDiscountElement.textContent = promoDiscount.toFixed(2);
  }

  // Apply promo code
  applyPromoButton.addEventListener('click', () => {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (code === "IRISH10") {
      promoDiscount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1;
      alert("Promo code applied! 10% off your order.");
    } else {
      promoDiscount = 0;
      alert("Invalid promo code.");
    }
    calculateTotal();
  }); 
  document.getElementById('check').addEventListener('change', function () {
    const cartTotalElement = document.getElementById('cart-total'); // Get the cart total element
    let currentTotal = parseFloat(cartTotalElement.textContent); // Get the current total and parse it as a float
    
    if (this.checked) {
      currentTotal += 5; // Add 5 if the checkbox is checked
    } else {
      currentTotal -= 5; // Subtract 5 if the checkbox is unchecked
    }
  
    // Update the cart total element with the new value
    cartTotalElement.textContent = currentTotal.toFixed(2); // Keep it to 2 decimal places
  });
  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.item;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });

  // Quantity change event
  cartItemsElement.addEventListener('change', (e) => {
    if (e.target.classList.contains('cart-quantity')) {
      const index = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value);
      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        calculateTotal();
      }
    }
  });

  // Remove item event
  cartItemsElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      calculateTotal();
      updateCartCount();
    }
  });

  // Initial render
  renderCartItems();
  calculateTotal();
  updateCartCount();
});




// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize or retrieve the cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartCountElement = document.getElementById('cart-count');
  const cartLink = document.getElementById('cart-link');

  // Function to update the cart count in the navbar
  function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }

  // Function to save the cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Function to display a notification (optional)
  function showNotification(message) {
    // Simple alert for demonstration; replace with a better UI if desired
    alert(message);
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-item');
      const itemPrice = parseFloat(button.getAttribute('data-price'));
      const itemImage = button.getAttribute('data-image');

      // Check if the item is already in the cart
      const existingItem = cart.find(item => item.name === itemName);

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If not, add as a new item
        cart.push({
          name: itemName,
          price: itemPrice,
          image: itemImage,
          quantity: 1
        });
      }

      // Save the updated cart and update the count
      saveCart();
      updateCartCount();

      // Notify the user
      showNotification(`${itemName} has been added to your cart.`);
    });
  });

  // Initial cart count update on page load
  updateCartCount();
});

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Get the checkout button
  const checkoutButton = document.getElementById("checkout-button");

  // Add an event listener for the checkout button
  checkoutButton.addEventListener("click", () => {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Generate the receipt content
    let receipt = "Receipt:\n\n";
    let total = 0;

    cartItems.forEach((item) => {
      const { name, price, quantity } = item; // Ensure the object has these keys
      const itemTotal = price * quantity; // Calculate the total for this item
      total += itemTotal; // Add to the overall total

      // Format the receipt line for this item
      receipt += `${name} (x${quantity}): $${itemTotal.toFixed(2)}\n`;
    });

    // Add the subtotal, promo discount, and final total
    const promoDiscount = parseFloat(document.getElementById("promo-discount").textContent) || 0;
    const cartTotal = parseFloat(document.getElementById("cart-total").textContent) || total;

    receipt += `\nSubtotal: $${total.toFixed(2)}`;
    receipt += `\nPromo Discount: -$${promoDiscount.toFixed(2)}`;
    receipt += `\nTotal: $${cartTotal.toFixed(2)}`;

    // Print the receipt (or replace with rendering logic)
    alert(receipt);

    // Clear the cart and refresh the page
    localStorage.removeItem("cart");
    window.location.reload();
  });
});


// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize or retrieve the cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartCountElement = document.getElementById('cart-count');
  const cartLink = document.getElementById('cart-link');

  // Function to update the cart count in the navbar
  function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }

  // Function to save the cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Function to display a notification (optional)
  function showNotification(message) {
    // Simple alert for demonstration; replace with a better UI if desired
    alert(message);
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-item');
      const itemPrice = parseFloat(button.getAttribute('data-price'));
      const itemImage = button.getAttribute('data-image');

      // Check if the item is already in the cart
      const existingItem = cart.find(item => item.name === itemName);

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If not, add as a new item
        cart.push({
          name: itemName,
          price: itemPrice,
          image: itemImage,
          quantity: 1
        });
      }

      // Save the updated cart and update the count
      saveCart();
      updateCartCount();

      // Notify the user
      showNotification(`${itemName} has been added to your cart.`);
    });
  });

  // Function to render cart items on the cart page
  function renderCart() {
    if (!document.querySelector('.cart-container')) return; // Exit if not on cart page

    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalElement.textContent = '0.00';
      checkoutButton.disabled = true;
      return;
    }

    // Create HTML for each cart item
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

    // Enable the checkout button
    checkoutButton.disabled = false;

    // Update the total price
    updateCartTotal();
  }

  // Function to update the total price
  function updateCartTotal() {
    const cartTotalElement = document.getElementById('cart-total');
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toFixed(2);
  }

  // Event listener for quantity changes on the cart page
  if (document.querySelector('.cart-container')) {
    const cartItemsElement = document.getElementById('cart-items');

    cartItemsElement.addEventListener('change', (e) => {
      if (e.target.classList.contains('cart-quantity-input')) {
        const index = e.target.getAttribute('data-index');
        const newQuantity = parseInt(e.target.value);

        if (newQuantity > 0) {
          cart[index].quantity = newQuantity;
          saveCart();
          updateCartCount();
          renderCart();
        }
      }
    });

    // Event listener for removing items on the cart page
    cartItemsElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item-button')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCart();
      }
    });

    // Initial render of the cart
    renderCart();
  }

  // Initial cart count update on page load
  updateCartCount();
});

