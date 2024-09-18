document.addEventListener('DOMContentLoaded', function() {
    const tonnageInput = document.getElementById('tonnage');
    const amountPaidInput = document.getElementById('amountPaid');
    const totalPaymentInput = document.getElementById('totalpayment');
    const form = document.querySelector('form[name="sales"]');

    function calculateTotalPayment() {
        const tonnage = parseFloat(tonnageInput.value) || 0;
        const amountPaid = parseFloat(amountPaidInput.value) || 0;
        const totalPayment = tonnage * amountPaid;
        totalPaymentInput.value = totalPayment; 
    }

    function validateForm(event) {
        const produceName = document.getElementById('produceName').value;
        const tonnage = tonnageInput.value;
        const amountPaid = amountPaidInput.value;
        const buyerName = document.getElementById('buyerName').value;
        const salesAgentName = document.getElementById('salesAgentName').value;
        const branch = document.getElementById('branch').value;
        const dateTime = document.getElementById('dateTime').value;

        if (!produceName) {
            alert('Please select the name of the produce.');
            event.preventDefault();
            return false;
        }

        if (tonnage.length < 3 || isNaN(tonnage)) {
            alert('Tonnage must be a number and at least 3 digits.');
            event.preventDefault();
            return false;
        }

        if (amountPaid.length < 5) {
            alert('Amount Paid must be at least 5 characters.');
            event.preventDefault();
            return false;
        }

        if (!/^[a-z0-9]+$/i.test(buyerName) || buyerName.length < 2) {
            alert('Buyer\'s Name must be alphanumeric and at least 2 characters long.');
            event.preventDefault();
            return false;
        }

        if (!/^[a-z0-9]+$/i.test(salesAgentName) || salesAgentName.length < 2) {
            alert('Sales Agent\'s Name must be alphanumeric and at least 2 characters long.');
            event.preventDefault();
            return false;
        }

        if (!branch) {
            alert('Please select a branch.');
            event.preventDefault();
            return false;
        }

        if (!dateTime) {
            alert('Please select a date and time.');
            event.preventDefault();
            return false;
        }

        return true;
    }

    tonnageInput.addEventListener('input', calculateTotalPayment);
    amountPaidInput.addEventListener('input', calculateTotalPayment);

    form.addEventListener('submit', function(event) {
        if (!validateForm(event)) {
            event.preventDefault(); 
      }
    });
});