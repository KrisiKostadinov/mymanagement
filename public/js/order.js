function checkProduct(data) {
    const order = JSON.parse(localStorage.getItem('products')) || [];
    const isExists = checkById(data.id, order, getProducts());

    if (isExists) {
        removeProduct(data.id);
        return;
    }

    addProduct(
        data.id,
        data.name,
        data.price,
        data.bestDays,
        data.count
    );

    checkIsExists(JSON.parse(localStorage.getItem('products')));
}

function removeProduct(id) {
    const order = JSON.parse(localStorage.getItem('products')) || [];
    const products = order.filter((p => p.id !== id));

    localStorage.setItem('products', JSON.stringify(products));

    var button = document.querySelector(`[data-form-id="${id}"]`);
    button.parentElement.parentElement.querySelector('input').value = 0;
    button.innerText = 'Add product';
    button.style.color = '';
    button.parentElement.parentElement.querySelector('input').disabled = false;
    button.disabled = true;

    checkIsEmptyProducts(products);
    totalSum(products);
}

function checkIsEmptyProducts(products) {
    if(!products) {
        return;
    }

    if (products.length === 0) {
        document.getElementById('data-add-order').disabled = true;
    } else {
        document.getElementById('data-add-order').disabled = false;
    }
}

function addProduct(id, name, price, bestDays, count) {
    const order = JSON.parse(localStorage.getItem('products')) || [];
    order.push({ id, name, price, bestDays, count });

    var button = document.querySelector(`[data-form-id="${id}"]`);
    button.parentElement.parentElement.querySelector('input').disabled = true;
    localStorage.setItem('products', JSON.stringify(order));

    document.getElementById('data-add-order').disabled = false;

    totalSum(order);
}

function getProducts() {
    const products = JSON.parse(localStorage.getItem('products'));
    return products;
}

function checkById(id, order, products, i) {
    if (i) {
        return order.some((p => p.id === products[i].id));
    } else {
        return order.some((p => p.id === id));
    }
}

function checkIsExists(order) {
    const products = getProducts();

    if(!products) {
        document.querySelectorAll('[button]').forEach(button => {
            button.parentElement.parentElement.querySelector('input').value = 0;
            button.innerText = 'Add product';
            button.style.color = '';
            button.parentElement.parentElement.querySelector('input').value = 0;
            button.parentElement.parentElement.querySelector('input').disabled = false;
            button.disabled = true;
        });
    }

    checkIsEmptyProducts(products);

    for (let i = 0; i < products?.length; i++) {
        var button = document.querySelector(`[data-form-id="${products[i].id}"]`);
        button.parentElement.parentElement.querySelector('input');

        const isExists = checkById(products[i].id, order, products, i);

        if (!isExists) {
            button.innerText = 'Add product';
            button.style.color = '';
        } else {
            button.innerText = 'Remove product';
            button.style.color = 'red';
            button.parentElement.parentElement.querySelector('input').value = products[i].count;
            button.disabled = false;
            button.parentElement.parentElement.querySelector('input').disabled = true;
        }
    }

    console.log(order);
    totalSum(order);
}

window.addEventListener('DOMContentLoaded', () => {
    checkIsExists(JSON.parse(localStorage.getItem('products')) || []);

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (event) => {
            if (input.value == 0) {
                event.target.parentElement.parentElement.querySelector('button').disabled = true;
            } else {
                event.target.parentElement.parentElement.querySelector('button').disabled = false;
            }
        });
    });
});

$('#data-add-order').click(function () {
    const products = JSON.parse(localStorage.getItem('products'));

    $('#data-add-order').text('Sending order');
    $('#data-add-order').attr('disabled', true);

    fetch('/order/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: products, totalSum: totalSum(products) }),
    }).then((data) => {
        localStorage.clear();
        checkIsExists(JSON.parse(localStorage.getItem('products')) || []);
        document.getElementById('success').style.display = '';
        $('#data-add-order').text('Send order');
    }).catch(err => {
        console.log(err);
    });
});

function totalSum(order) {
    var totalSum = 0;

    order.forEach(product => {
        totalSum += Number(product.price) * Number(product.count);
    });

    document.querySelector('#total-sum span').innerText = totalSum.toFixed(2);

    return totalSum;
}