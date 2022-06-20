const addToCartButton = document.querySelector('#add-to-cart');

function setNewCartCount(count) {
    const carCounts = document.querySelectorAll('.badge');
    carCounts.forEach(el => {
        el.textContent = count;
    })
}

function addItemToCart() {
    fetch(addToCartButton.dataset.action, {
        method: 'POST'
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            setNewCartCount(data.totalQuantity);
        }
    })
    .catch((err) => {
        alert(err);
    })
}

addToCartButton.addEventListener('click', addItemToCart);