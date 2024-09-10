// document.addEventListener('DOMContentLoaded', function() {
//     const tonnageInput = document.getElementById('tonnage');
//     const costInput = document.getElementById('cost');
//     const totalCostInput = document.getElementById('totalcost');

//     function calculateTotalCost() {
//         const tonnage = parseFloat(tonnageInput.value) || 0;
//         const cost = parseFloat(costInput.value) || 0;
//         const totalCost = tonnage * cost;
//         totalCostInput.value = totalCost;
//     }

    
//     tonnageInput.addEventListener('input', calculateTotalCost);
//     costInput.addEventListener('input', calculateTotalCost);
// });

// function validateForm() {
//     const produceName = document.getElementById("produceName").value;
//     const produceType = document.getElementById("produceType").value;
//     const dateTime = document.getElementById("dateTime").value;
//     const tonnage = document.getElementById("tonnage").value;
//     const cost = document.getElementById("cost").value;
//     const dealerName = document.getElementById("dealerName").value;
//     const branch = document.getElementById("branch").value;
//     const contact = document.getElementById("contact").value;
//     const price = document.getElementById("price").value;

//     if (produceName === '' || !/^[a-zA-Z0-9\s]+$/.test(produceName)) {
//         alert("Name of produce should be alphanumeric and not empty.");
//         return false;
//     }

//     if (produceType === '' || !/^[A-Za-z]{2,}$/.test(produceType)) {
//         alert("Type of produce should contain alphabets only, be at least 2 characters long, and not empty.");
//         return false;
//     }

//     if (!dateTime) {
//         alert("Date and Time cannot be empty.");
//         return false;
//     }

//     if (!tonnage || isNaN(tonnage) || tonnage < 100) {
//         alert("Tonnage should be numeric, not empty, and at least 100 kg.");
//         return false;
//     }

//     if (!cost || isNaN(cost) || cost < 100) {
//         alert("Cost should be numeric, not empty, and at least 10,000 UgX.");
//         return false;
//     }

//     if (dealerName === '' || !/^[a-zA-Z0-9\s]{2,}$/.test(dealerName)) {
//         alert("Name of dealer should be alphanumeric, not empty, and at least 2 characters long.");
//         return false;
//     }

//     if (branch === '') {
//         alert("Please select a branch.");
//         return false;
//     }

//     if (!contact.match(/^07\d{8}$/)) {
//         alert("Contact should be a valid 10-digit phone number starting with 07.");
//         return false;
//     }

//     if (!price || isNaN(price) || price < 100) {
//         alert("Price to be sold at should be numeric, not empty, and at least 10,000 UgX.");
//         return false;
//     }

//     return true;
// }


// Function to set the current date and time
function setCurrentDateTime() {
    const now = new Date();
    // Format date as YYYY-MM-DD
    const dateStr = now.toISOString().split('T')[0];
    // Format time as HH:MM
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
  
    // Set the dateOfDispatch and time input fields
    document.getElementById('date').value = dateStr;
    document.getElementById('time').value = timeStr;
  }
  
  // Call the function when the page loads
  window.onload = setCurrentDateTime;
  
  document.addEventListener('DOMContentLoaded', function () {
    // Function to update total cost
    function updateTotalCost() {
        let tonnage = parseFloat(document.getElementById("tonnage").value) || 0;
        let cost = parseFloat(document.getElementById("cost").value) || 0;
        let totalcostInput = document.getElementById("totalcost");
        totalcostInput.value = tonnage * cost;
    }

    // Add event listeners to both tonnage and cost inputs for real-time updates
    document.getElementById('tonnage').addEventListener("input", updateTotalCost);
    document.getElementById('cost').addEventListener("input", updateTotalCost);
    
    // Initial calculation in case the fields have pre-filled values
    updateTotalCost();

    // Set total cost input to read-only
    document.getElementById('totalcost').setAttribute('readonly', true);
});


