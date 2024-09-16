function validateForm() {
    // Select form elements
    const produceName = document.getElementById('produceName');
    const produceType = document.getElementById('produceType');
    const buyerName = document.getElementById('buyerName');
    const tonnage = document.getElementById('tonnage');
    const produceCost = document.getElementById('produceCost');
    const amountPaid = document.getElementById('amountPaid');
    const nationalId = document.getElementById('nationalId');
    const location = document.getElementById('location');
    const contacts = document.getElementById('contacts');
    const dispatchDate = document.getElementById('dispatchDate');
    const dueDate = document.getElementById('dueDate');
    const branch = document.getElementById('branch');
    const salesAgent = document.getElementById('salesAgent');
    
    // Select error elements
    const errorBuyerName = document.getElementById('errorBuyerName');
    const errorTonnage = document.getElementById('errorTonnage');
    const errorProduceCost = document.getElementById('errorProduceCost');
    const errorAmountPaid = document.getElementById('errorAmountPaid');
    const errorNationalId = document.getElementById('errorNationalId');
    const errorLocation = document.getElementById('errorLocation');
    const errorContacts = document.getElementById('errorContacts');
    const errorDispatchDate = document.getElementById('errorDispatchDate');
    const errorDueDate = document.getElementById('errorDueDate');
    const errorBranch = document.getElementById('errorBranch');
    const errorSalesAgent = document.getElementById('errorSalesAgent');
    const errorProduceName = document.getElementById('errorProduceName');
    const errorProduceType = document.getElementById('errorProduceType');
  
    let errorCount = 0;
  
    // Validate Produce Name (alpha-numeric, not less than 2 characters, not empty)
    if (produceName.value.trim() === "" || produceName.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(produceName.value)) {
      produceName.style.border = "1px solid red";
      errorProduceName.textContent = "Produce name must be alpha-numeric";
      errorCount++;
    } else {
      produceName.style.border = "1px solid green";
      errorProduceName.textContent = "";
    }
  
    // Validate Produce Type (cannot be empty)
    if (produceType.value === "") {
      produceType.style.border = "1px solid red";
      errorProduceType.textContent = "Select produce type";
      errorCount++;
    } else {
      produceType.style.border = "1px solid green";
      errorProduceType.textContent = "";
    }
  
    // Validate Buyer Name (alpha-numeric, not less than 2 characters)
    if (buyerName.value.trim() === "" || buyerName.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(buyerName.value)) {
      buyerName.style.border = "1px solid red";
      errorBuyerName.textContent = "Buyer name must be alpha-numeric";
      errorCount++;
    } else {
      buyerName.style.border = "1px solid green";
      errorBuyerName.textContent = "";
    }
  
    // Validate National ID (Valid NIN format: assuming NIN contains exactly 14 alphanumeric characters)
    if (!/^[A-Z0-9]{14}$/.test(nationalId.value)) {
      nationalId.style.border = "1px solid red";
      errorNationalId.textContent = "Enter a valid National ID";
      errorCount++;
    } else {
      nationalId.style.border = "1px solid green";
      errorNationalId.textContent = "";
    }
  
    // Validate Location (alpha-numeric, not less than 2 characters)
    if (location.value.trim() === "" || location.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(location.value)) {
      location.style.border = "1px solid red";
      errorLocation.textContent = "Location must be alpha-numeric";
      errorCount++;
    } else {
      location.style.border = "1px solid green";
      errorLocation.textContent = "";
    }
  
    // Validate Contacts (local and international phone number format)
    const internationalPhoneRegex = /^\+\d{1,15}$/; // International phone regex (+ followed by up to 15 digits)
    const phoneRegex = /^\d{10}$/; // Local phone regex (exactly 10 digits)

    if (contacts.value.trim() === "") {
      contacts.style.border = "1px solid red";
      errorContacts.textContent = "Enter a phone number";
      errorCount++;
    } else if (
      !contacts.value.match(phoneRegex) &&
      !contacts.value.match(internationalPhoneRegex)
    ) {
      contacts.style.border = "1px solid red";
      errorContacts.textContent = "Enter valid Phone number";
      errorCount++;
    } else {
      contacts.style.border = "1px solid green";
      errorContacts.textContent = "";
    }
  
    // Validate Amount Paid (UGX, must be a number and at least 5 digits)
    if (amountPaid.value.trim() === "" || isNaN(amountPaid.value) || parseFloat(amountPaid.value) < 5) {
      amountPaid.style.border = "1px solid red";
      errorAmountPaid.textContent = "Amount paid must be least 5 digits";
      errorCount++;
    } else {
      amountPaid.style.border = "1px solid green";
      errorAmountPaid.textContent = "";
    }
  
    // Validate Tonnage (UGX, must be a number and at least 0.01)
    if (tonnage.value.trim() === "" || isNaN(tonnage.value) || parseFloat(tonnage.value) < 0.01) {
      tonnage.style.border = "1px solid red";
      errorTonnage.textContent = "Enter tonnage in numbers";
      errorCount++;
    } else {
      tonnage.style.border = "1px solid green";
      errorTonnage.textContent = "";
    }
  
    // Validate Produce Cost (UGX, must be a number and at least 1)
    if (produceCost.value.trim() === "" || isNaN(produceCost.value) || parseFloat(produceCost.value) < 1) {
      produceCost.style.border = "1px solid red";
      errorProduceCost.textContent = "Produce cost must be at least 1";
      errorCount++;
    } else {
      produceCost.style.border = "1px solid green";
      errorProduceCost.textContent = "";
    }
  
    // Validate Total Cost (auto-calculated, no user input needed)
    // Assuming it's correctly set by your calculations
  
    // Validate Amount Due (auto-calculated, no user input needed)
    // Assuming it's correctly set by your calculations
  
    // Validate Dispatch Date (must be a valid date and not in the past)
    // const today = new Date().toISOString().split('T')[0];
    // if (dispatchDate.value < today) {
    //   dispatchDate.style.border = "1px solid red";
    //   errorDispatchDate.textContent = "Dispatch date cannot be in the past";
    //   errorCount++;
    // } else {
    //   dispatchDate.style.border = "1px solid green";
    //   errorDispatchDate.textContent = "";
    // }
  
    // Validate Due Date (must be a valid date and not before the dispatch date)
    if (dueDate.value < dispatchDate.value) {
      dueDate.style.border = "1px solid red";
      errorDueDate.textContent = "Due date must be after dispatch date";
      errorCount++;
    } else {
      dueDate.style.border = "1px solid green";
      errorDueDate.textContent = "";
    }
  
    // Validate Branch (cannot be empty)
    if (branch.value === "") {
      branch.style.border = "1px solid red";
      errorBranch.textContent = "Select a branch";
      errorCount++;
    } else {
      branch.style.border = "1px solid green";
      errorBranch.textContent = "";
    }
  
    // Validate Sales Agent Name (alpha-numeric, not less than 2 characters)
    if (salesAgent.value.trim() === "" || salesAgent.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(salesAgent.value)) {
      salesAgent.style.border = "1px solid red";
      errorSalesAgent.textContent = "Name must be alpha-numeric";
      errorCount++;
    } else {
      salesAgent.style.border = "1px solid green";
      errorSalesAgent.textContent = "";
    }
  
    // Return false if any errors were found
    return errorCount === 0;
}


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
  

document.addEventListener('DOMContentLoaded', function () {
    // Function to update total cost
    function updateTotalCost() {
        let tonnage = parseFloat(document.getElementById("tonnage").value) || 0;
        let produceCost = parseFloat(document.getElementById("produceCost").value) || 0;
        let totalCostInput = document.getElementById("totalCost");
        totalCostInput.value = tonnage * produceCost;
    }

    // Add event listeners to both tonnage and cost inputs for real-time updates
    document.getElementById('tonnage').addEventListener("input", updateTotalCost);
    document.getElementById('produceCost').addEventListener("input", updateTotalCost);
    
    // Initial calculation in case the fields have pre-filled values
    updateTotalCost();

    // Set total cost input to read-only
    document.getElementById('totalCost').setAttribute('readonly', true);
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to update total cost
    function updateAmountDue() {
        let totalCost = parseFloat(document.getElementById("totalCost").value) || 0;
        let amountPaid = parseFloat(document.getElementById("amountPaid").value) || 0;
        let amountDueInput = document.getElementById("amountDue");
        amountDueInput.value = totalCost - amountPaid;
    }

    // Add event listeners to both tonnage and cost inputs for real-time updates
    document.getElementById('totalCost').addEventListener("input", updateAmountDue);
    document.getElementById('amountPaid').addEventListener("input", updateAmountDue);
    
    // Initial calculation in case the fields have pre-filled values
    updateAmountDue();

    // Set total cost input to read-only
    document.getElementById('totalCost').setAttribute('readonly', true);
});