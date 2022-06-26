const orderFormElements = document.querySelectorAll('.order-actions form');

function updateOrderStatus(form) {
    const _csrf = document.querySelector('input[name="_csrf"]');
    const orderid = document.querySelector('input[name="orderid"]');
    const status = document.querySelector('select[name="status"]');

    fetch('/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({
            _csrf: _csrf.value,
            orderid: orderid.value,
            status: status.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            const orderItem = form.parentElement.parentElement;
            const badge = orderItem.querySelector('.order-summary .badge');
            
            badge.textContent = data.newStatus.toUpperCase();
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        alert(err);
    })
}

orderFormElements.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateOrderStatus(form);
    })
})