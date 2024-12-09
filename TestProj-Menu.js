document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
      { name: "Fish and Chips", price: 14.99, image: "images/fish_and_chips.jpg" },
      { name: "Shepherd's Pie", price: 12.99, image: "images/shepherds_pie.jpg" },
      { name: "Irish Stew", price: 13.99, image: "images/irish_stew.jpg" },
      { name: "Corned Beef Sandwich", price: 10.99, image: "images/corned_beef.jpg" },
      { name: "Guinness Beef Burger", price: 11.99, image: "images/beef_burger.jpg" },
      { name: "Bangers and Mash", price: 12.49, image: "images/bangers_mash.jpg" },
      { name: "Mulligan's Caesar Salad", price: 9.99, image: "images/caesar_salad.jpg" },
      { name: "Traditional Irish Breakfast", price: 15.99, image: "images/irish_breakfast.jpg" },
      { name: "Beef and Guinness Pie", price: 13.99, image: "images/guinness_pie.jpg" },
      { name: "Chicken Tenders and Fries", price: 9.99, image: "images/chicken_tenders.jpg" },
      { name: "Potato Leek Soup", price: 6.99, image: "images/potato_leek_soup.jpg" },
      { name: "Irish Brown Bread", price: 5.49, image: "images/brown_bread.jpg" },
      { name: "Garlic Butter Shrimp", price: 14.49, image: "images/garlic_shrimp.jpg" },
      { name: "Loaded Nachos", price: 10.49, image: "images/loaded_nachos.jpg" },
      { name: "Grilled Salmon", price: 18.99, image: "images/grilled_salmon.jpg" },
      { name: "Mulligan's Chicken Wings", price: 11.99, image: "images/chicken_wings.jpg" },
      { name: "Beer Battered Onion Rings", price: 7.99, image: "images/onion_rings.jpg" },
      { name: "Irish Cream Cheesecake", price: 6.99, image: "images/irish_cheesecake.jpg" },
      { name: "Chocolate Lava Cake", price: 7.49, image: "images/lava_cake.jpg" },
      { name: "Apple Crumble Pie", price: 6.49, image: "images/apple_pie.jpg" }
    ];
  
    const menuContainer = document.getElementById('menu-items');
  
    // Render menu items dynamically
    menuContainer.innerHTML = menuItems
      .map(
        (item, index) => `
          <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-price">$${item.price.toFixed(2)}</p>
            <button 
              class="add-to-cart" 
              data-item="${item.name}" 
              data-price="${item.price}" 
              data-image="${item.image}" 
              data-index="${index}"
            >
              Add to Cart
            </button>
          </div>`
      )
      .join("");
  
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
  

  // Extend script.js
document.addEventListener('DOMContentLoaded', () => {
    // ... Existing Add to Cart functionality
  
    // Check if we're on the cart page
    if (document.querySelector('.cart-container')) {
      const cartItemsElement = document.getElementById('cart-items');
      const cartTotalElement = document.getElementById('cart-total');
      const checkoutButton = document.getElementById('checkout-button');
  
      // Function to render cart items
      function renderCart() {
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
  
        // Update the total
        updateCartTotal();
      }
  
      // Function to update the total price
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
            saveCart();
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
          saveCart();
          updateCartCount();
          renderCart();
        }
      });
  
      // Initial render of the cart
      renderCart();
    }
  });
  