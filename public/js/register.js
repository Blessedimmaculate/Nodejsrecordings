document.getElementById('register-form').addEventListener('register', function(event) {
    event.preventDefault();
    validateInputs();

// Get the values from the form fields
const username = document.getElementById('username').value.trim();
const email = document.getElementById('email').value.trim;
const phoneNumber = document.getElementById('phoneNumber').value.trim();
const role = document.getElementById('role').value.trim();
const branch = document.getElementById('branch').value.trim();
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword ').value;



const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success")
    inputControl.classList.remove("error")
}

const isValidEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());

}

   if(usernameValue === ""){
    setError(username, "Username is required");
   }
   else{
       setSuccess(username);
   }

   if(emailValue === "") {
    setError(email, "Email is required")
   }
   else if (!isValidEmail(emailValue)){
    setError(email, "Provide a valid email address")
   }
   else {
    setSuccess(email)
   }

   if(passwordValue === "") {
    setError(password, "Password is required");
   }
   else if (passwordValue.length > 8) {
    setError(password, "Password must be atleast 8 character")
   }
   else{
    setSuccess(password);
   }

   if(password2Value === "") {
    setError(password2, "Please confirm your password")
   }
   else if (password2Value !== passwordValue){
    setError(password2, "Passwords don't match")
   }
   else {
    setSuccess(password2);
   }
    
});

