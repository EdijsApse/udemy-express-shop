const productDeleteButtons = document.querySelectorAll('.product-item button');

function deleteProduct(event) {
    const button = event.target;

    fetch(button.dataset.action, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            const productItem = button.closest('li');
            productItem.remove();
        } else {
            alert(data.message);
        }
    })
    .catch((err) => {
        alert(err);
    })
}

productDeleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        deleteProduct(event)
    })
})