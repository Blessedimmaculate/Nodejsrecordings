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

    const table = document.getElementById('produce-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const email = document.getElementById('email');

    let error = 0;
    const formValidation = (event) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = document.getElementById('emailError');
        if(email.value == ''){
            email.style.border = '1px solid red';
            emailError.textContent = 'please enter an email address'
            emailError.style = 'color:red'
            error++ //value of error is increased by 1
        }
        else if(!email.value.match(emailRegex)){
            email.style.border = '1px solid red';
            emailError.textContent = 'please enter a valid email address'
            emailError.style = 'color:red'
            error++ //value of error is increased by 1
        }
        else{
            email.style.border = '1px solid green'
            emailError.textContent = ''
        }
    
    if(error > 0){
        event.preventDefault()
    }
    }

    // Reset form
    document.getElementById('produce-form').reset();
});
