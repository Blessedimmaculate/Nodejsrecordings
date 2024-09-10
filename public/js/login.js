//function that submits my form
function submitForm() {
    //collect form data
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    

    //validate email format
    const emailFormat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

    //validate form data
    if (  email === "" || password === "") {
        alert("Please fill out all fields");
        return;
    }
    else if (!email.match(emailFormat)) {
        alert("Please enter a valid email");
        return;
    }
   
    else {
        alert("Form submitted successfully");
        // clear form inputs
       
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
       
    }
};



// document.getElementById('submit').onclick = function() {
//     window.location.href = 'manager.html'; 
// };

// document.getElementById('submt').onclick = function() {
//     window.location.href = 'salesagent.html'; 
// };
