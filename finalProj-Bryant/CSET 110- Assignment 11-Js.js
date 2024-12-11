document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    // Add event listeners to cart quantity inputs and remove buttons
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.addEventListener('click', handleCartClick);
    cartItemsContainer.addEventListener('input', quantityChanged);

    document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked);

    updateCartTotal();
});

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.closest('.shop-item');
    const title = shopItem.querySelector('.shop-item-title').innerText;
    const price = shopItem.querySelector('.shop-item-price').innerText;
    const imageSrc = shopItem.querySelector('.shop-item-image').src;

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItemNames = cartItemsContainer.querySelectorAll('.cart-item-title');

    // Check if the item is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart');
            return;
        }
    }

    // Create cart row
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;

    cartItemsContainer.append(cartRow);
}

function handleCartClick(event) {
    const button = event.target;
    if (button.classList.contains('btn-danger')) {
        removeCartItem(button);
    }
}

function removeCartItem(button) {
    button.closest('.cart-row').remove();
    updateCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (input.classList.contains('cart-quantity-input')) {
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }
}

function updateCartTotal() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartRows = cartItemsContainer.querySelectorAll('.cart-row');
    let total = 0;

    cartRows.forEach(row => {
        const priceElement = row.querySelector('.cart-price');
        const quantityElement = row.querySelector('.cart-quantity-input');
        const price = parseFloat(priceElement.innerText.replace('$', ''));
        const quantity = parseInt(quantityElement.value);
        total += price * quantity;
    });

    total = Math.round(total * 100) / 100; // Round to 2 decimal places
    document.querySelector('.cart-total-price').innerText = `$${total}`;
}

function purchaseClicked() {
    alert('Thank you for your purchase!');
    const cartItemsContainer = document.querySelector('.cart-items');
    while (cartItemsContainer.firstChild) {
        cartItemsContainer.firstChild.remove();
    }
    updateCartTotal();
}
