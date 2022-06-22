const cartProductUpdateButtons = document.querySelectorAll('.cart-item-management button');

function updateCartItemQuantity(button) {
    const productId = button.dataset.product;
    const csrf = button.dataset.csrf;
    const quantity = button.parentElement.querySelector('input').value;

    fetch(`/cart/${productId}/update-quantity?_csrf=${csrf}`, {
        method: 'PATCH',
        body: JSON.stringify({quantity: quantity}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            const cart = data.data;
            const cartItemInfoElement = button.parentElement.parentElement.querySelector('.cart-item-info');
            cartItemInfoElement.querySelector('p').innerHTML = `$${cart.item.totalPrice.toFixed(2)}<span class="cart-product-price">($${cart.item.product.price.toFixed(2)})</span>`;

            const cartTotal = document.querySelector('#cart-total p span');
            cartTotal.textContent = +cart.cartTotalPrice.toFixed(2);

            const totalQuantityElements = document.querySelectorAll('.badge');
            totalQuantityElements.forEach(el => {
                el.textContent = cart.cartTotalQuantity;
            })
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        alert(err);
    })
}

cartProductUpdateButtons.forEach(button => {
    button.addEventListener('click', function() {
        updateCartItemQuantity(button);
    })
})