// Displays errors at once
// small#usernameErr
const Validate = (event) => {
    let error = 0

let username = document.getElementById("username")
let email = document.getElementById("email")
let mobileNumber= document.getElementById("mobileNumber")
let branch = document.getElementById("branch")
let role = document.getElementById("role")
let password = document.getElementById("password")
let registrationDate = document.getElementById|("registrationDate")


let usernameErr= document.getElementById("usernameErr")
let emailErr= document.getElementById("emailErr")
let mobileNumberErr = document.getElementById("mobileNumberErr")
let branchErr = document.getElementById("branchErr")
let roleErr = document.getElementById("roleErr")
let passwordErr = document.getElementById("passwordErr")
// let = document.getElementById("")


if (username.value == "") {
    username.style.border = "1px solid red"
    usernameErr.textContent = "Username cannot be empty"
    usernameErr.style = "color: red; font-size: 11px; font-family:Sansita;"
    // Return false
    error++
}
else if (username.value.length < 3) {
    username.style.border = "1px solid red"
    usernameErr.textContent = "Please username must be atleast three characters"
    usernameErr.style = "color: red; font-size: 11px; font-family:Sansita;"
    // Return false
    error++
}
else if (username.value.length > 25) {
    username.style.border = "1px solid red"
    usernameErr.textContent = "Please username length must be atmost 25 characters"
    usernameErr.style = "color: red; font-size: 11px; font-family:Sansita;"
    // Return false
    error++
}
else {
    username.style.border = "1px solid green"
    usernameErr.textContent = ""
}

// Other validations



// Last code block
if (error > 0) {
    event.preventDefault()
}
};


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
