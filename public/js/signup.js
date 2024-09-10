document.querySelector('form').addEventListener('submit', function(event) {
    let fullname = document.querySelector('#name').value;
    let phoneNumber = document.querySelector('#phoneNumber').value;
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    
    if (fullname === '' || phoneNumber === '' || username === '' || email === '' || password === '') {
        alert('Please fill in all fields.');
        event.preventDefault();
    }
});