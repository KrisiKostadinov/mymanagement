$('#calculateSumOfOrders').click(() => {
    $('#calculateSumOfOrders').text('Calculating');
    const workerId = $('#workerId').val();
    fetch('/order/sumOfOrders/' + workerId)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                $('#orders-total').text(data.totalSum.toFixed(2));
                $('#orders-expected').text(data.expectedSum.toFixed(2));
                $('#orders-diff').text(data.diffSum.toFixed(2));
                $('#sales-count').text(data.salesCount);
                $('#expected-sales-count').text(data.expectedSalesCount);
                $('#orders-count').text(data.ordersCount);
            } else {
                $('#content').text(data.error);
            }
            
            $('#calculateSumOfOrders').text('Month report');
        });
});