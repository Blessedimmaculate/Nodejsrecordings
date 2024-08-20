document.addEventListener("DOMContentLoaded", function() {
    // Set the date input to today's date
    const dateInput = document.getElementById('date');
    const now = new Date();
    dateInput.value = now.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Set the time input to current time
    const timeInput = document.getElementById('time');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
});

document.getElementById('produce-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const produceName = document.getElementById('produceName').value;
    const produceType = document.getElementById('produceType').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tonnage = document.getElementById('tonnage').value;
    const cost = document.getElementById('cost').value;
    const dealerName = document.getElementById('dealerName').value;
    const branchName = document.getElementById('branchName').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email');

    let error = 0;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    if (email.value === '') {
        email.style.border = '1px solid red';
        emailError.textContent = 'Please enter an email address';
        emailError.style.color = 'red';
        error++;
    } else if (!email.value.match(emailRegex)) {
        email.style.border = '1px solid red';
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.color = 'red';
        error++;
    } else {
        email.style.border = '1px solid green';
        emailError.textContent = '';
    }

    if (error > 0) {
        event.preventDefault();
        return;
    }


    // Reset form
    document.getElementById('produce-form').reset();
});
