document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
  
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
  });
  