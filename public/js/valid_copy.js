const Validate = (event) => {
    let error = 0;

    // Get form elements
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let mobileNumber = document.getElementById("mobileNumber"); // Fixed id
    let branch = document.getElementById("branch");
    let role = document.getElementById("role");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let registrationDate = document.getElementById("registrationDate");

    // Get error elements
    let usernameErr = document.getElementById("usernameErr");
    let emailErr = document.getElementById("emailErr");
    let mobileNumberErr = document.getElementById("mobileNumberErr"); // Fixed id
    let branchErr = document.getElementById("branchErr");
    let roleErr = document.getElementById("roleErr");
    let passwordErr = document.getElementById("passwordErr");
    let confirmPasswordErr = document.getElementById("confirmPasswordErr");

    // Username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        usernameErr.textContent = "Username cannot be empty";
        usernameErr.style = "";
        error++;
    } else if (username.value.length < 3) {
        username.style.border = "1px solid red";
        usernameErr.textContent = "Username must be at least three characters";
        usernameErr.style = "";
        error++;
    } else if (username.value.length > 25) {
        username.style.border = "1px solid red";
        usernameErr.textContent = "Username length must be at most 25 characters";
        usernameErr.style = "";
        error++;
    } else {
        username.style.border = "1px solid green";
        usernameErr.textContent = "";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value == "") {
        email.style.border = "1px solid red";
        emailErr.textContent = "Email cannot be empty";
        emailErr.style = "";
        error++;
    } else if (!emailPattern.test(email.value)) {
        email.style.border = "1px solid red";
        emailErr.textContent = "Please enter a valid email address";
        emailErr.style = "";
        error++;
    } else {
        email.style.border = "1px solid green";
        emailErr.textContent = "";
    }

    // Mobile Number validation
    const mobilePattern = /^[0-9]{10}$/; // Adjust as needed for your format
    if (mobileNumber.value == "") {
        mobileNumber.style.border = "1px solid red";
        mobileNumberErr.textContent = "Mobile number cannot be empty";
        mobileNumberErr.style = "";
        error++;
    } else if (!mobilePattern.test(mobileNumber.value)) {
        mobileNumber.style.border = "1px solid red";
        mobileNumberErr.textContent = "Please enter a valid mobile number (10 digits)";
        mobileNumberErr.style = "";
        error++;
    } else {
        mobileNumber.style.border = "1px solid green";
        mobileNumberErr.textContent = "";
    }

    // Branch validation
    if (branch.value == "") {
        branch.style.border = "1px solid red";
        branchErr.textContent = "Branch cannot be empty";
        branchErr.style = "";
        error++;
    } else {
        branch.style.border = "1px solid green";
        branchErr.textContent = "";
    }

    // Role validation
    if (role.value == "") {
        role.style.border = "1px solid red";
        roleErr.textContent = "Role cannot be empty";
        roleErr.style = "";
        error++;
    } else {
        role.style.border = "1px solid green";
        roleErr.textContent = "";
    }

    // Password validation
    if (password.value == "") {
        password.style.border = "1px solid red";
        passwordErr.textContent = "Password cannot be empty";
        passwordErr.style = "";
        error++;
    } else if (password.value.length < 6) {
        password.style.border = "1px solid red";
        passwordErr.textContent = "Password must be at least 6 characters long";
        passwordErr.style = "";
        error++;
    } else {
        password.style.border = "1px solid green";
        passwordErr.textContent = "";
    }

    // Confirm Password validation
    if (confirmPassword.value == "") {
        confirmPassword.style.border = "1px solid red";
        confirmPasswordErr.textContent = "Confirm Password cannot be empty";
        confirmPasswordErr.style = "";
        error++;
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.style.border = "1px solid red";
        confirmPasswordErr.textContent = "Passwords do not match";
        confirmPasswordErr.style = "";
        error++;
    } else {
        confirmPassword.style.border = "1px solid green";
        confirmPasswordErr.textContent = "";
    }

    // Check if there were errors
    if (error > 0) {
        event.preventDefault(); // Prevent form submission
    }
};

// Set the current date in 'registrationDate' input field
document.addEventListener('DOMContentLoaded', () => {
    // Get the 'registrationDate' input element
    const registrationDateInput = document.querySelector('input[name="registrationDate"]');
    
    // Get the current date
    const now = new Date();

    // Format the date as 'YYYY-MM-DD' for the date input
    const formattedDate = now.toISOString().slice(0, 10); // This will give you the correct date format

    // Set the value of the 'registrationDate' input to the formatted date
    registrationDateInput.value = formattedDate;
});

// Attach the validation function to the form's submit event
document.getElementById('register-form').addEventListener('submit', Validate); // Fixed selector
