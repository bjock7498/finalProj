window.addEventListener('load', () => {
    const addForm = document.querySelector('#addItem');
    const removeForm = document.querySelector('#removeItem');
    const editForm = document.querySelector('#editItem');

    // Add item handler
    addForm && addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('#newItemName').value;
        const price = this.querySelector('#itemPrice').value;
        const imageUrl = this.querySelector('#imageUrl').value;
        const isAlcoholic = this.querySelector('#isAlcoholic').checked ? 1 : 0;

        fetch('http://localhost:3000/api/menu/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, imageUrl, isAlcoholic })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item added:', data);
                location.reload();
            })
            .catch(console.error);
    });

    // Edit item handler
    editForm && editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = this.querySelector('#editItemName').value;
        const newPrice = this.querySelector('#editPrice').value;

        fetch('http://localhost:3000/api/menu/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemName, newPrice })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item updated:', data);
                location.reload();
            })
            .catch(console.error);
    });

    // Remove item handler
    removeForm && removeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = this.querySelector('#removeItemName').value;

        fetch('http://localhost:3000/api/menu/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemName })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item removed:', data);
                location.reload();
            })
            .catch(console.error);
    });
});
