// function validateForm() {
//     let isValid = true;

//     const buyerName = document.forms["salesForm"]["buyerName"].value;
//     if (buyerName.length < 2 || !/^[a-zA-Z0-9 ]+$/.test(buyerName)) {
//         alert("Buyer Name must be at least 2 alphanumeric characters.");
//         isValid = false;
//     }

//     // const nationalId = document.forms["salesForm"]["nationalId"].value;
//     // if (!/^[A-Z]{3}[0-9]{8}[A-Z]$/.test(nationalId)) {
//     //     alert("Invalid National ID format. It should be of format 'XXX00000000X'.");
//     //     isValid = false;
//     // }

//     const location = document.forms["salesForm"]["location"].value;
//     if (location.length < 2 || !/^[a-zA-Z0-9 ]+$/.test(location)) {
//         alert("Location must be at least 2 alphanumeric characters.");
//         isValid = false;
//     }

//     const contacts = document.forms["salesForm"]["contacts"].value;
//     if (!/^\+?[0-9]{10,15}$/.test(contacts)) {
//         alert("Invalid phone format. It should be 10-15 digits long.");
//         isValid = false;
//     }

//     const amountDue = document.forms["salesForm"]["amountDue"].value;
//     if (!/^\d{5,}$/.test(amountDue)) {
//         alert("Amount Due must be at least 5 characters long and numeric.");
//         isValid = false;
//     }

//     const salesAgent = document.forms["salesForm"]["salesAgent"].value;
//     if (salesAgent.length < 2 || !/^[a-zA-Z0-9 ]+$/.test(salesAgent)) {
//         alert("Sales Agent Name must be at least 2 alphanumeric characters.");
//         isValid = false;
//     }

//     const produceName = document.forms["salesForm"]["produceName"].value;
//     if (produceName.length < 2 || !/^[a-zA-Z0-9 ]+$/.test(produceName)) {
//         alert("Produce Name must be at least 2 alphanumeric characters.");
//         isValid = false;
//     }

//     return isValid;
// }


// Function to set the current date and time
function setCurrentDateTime() {
    const now = new Date();
    // Format date as YYYY-MM-DD
    const dateStr = now.toISOString().split('T')[0];
    // Format time as HH:MM
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
  
    // Set the dateOfDispatch and time input fields
    document.getElementById('dispatchDate').value = dateStr;
    document.getElementById('time').value = timeStr;
  }
  
  // Call the function when the page loads
  window.onload = setCurrentDateTime;
  
document.getElementById('produceCost').addEventListener("change", function () {
    let tonnage = document.getElementById("tonnage").value;
    let produceCost = document.getElementById("produceCost").value;
    let totalCostInput = document.getElementById("totalCost");
    totalCostInput.value = tonnage*produceCost;
});

document.getElementById("amountPaid").addEventListener("change", function () {
    let totalCost = document.getElementById("totalCost").value;
    let amountPaid = document.getElementById("amountPaid").value;
    let amountDueInput = document.getElementById("amountDue");
    amountDueInput.value = totalCost - amountPaid;
    // amountDueInput.value = amountDue;


});