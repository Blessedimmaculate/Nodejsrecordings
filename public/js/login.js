function loginForm() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || !password) {
        alert("Please fill out all the required fields!");
        return false;
    } else if (!email.match(validEmailFormat)) {
        alert("Please enter a valid email address!");
        return false;
    } else {
        alert("You are welcome!");
        return true;
    }
}

let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // prevent form from submitting normally

    if (loginForm()) {
        document.getElementById("form").reset(); // reset form after successful submission
    }
});

