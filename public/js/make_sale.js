function validateForm() {
  // Select form elements
  const produceName = document.getElementById('produceName');
  const produceType = document.getElementById('produceType');
  const tonnage = document.getElementById('tonnage');
  const amountPaid = document.getElementById('amountPaid');
  const buyerName = document.getElementById('buyerName');
  const salesAgentName = document.getElementById('salesAgentName');
  const branch = document.getElementById('branch');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const totalPayment = document.getElementById('totalpayment');

  // Select error elements
  const errorProduceName = document.getElementById('errorProduceName');
  const errorProduceType = document.getElementById('errorProduceType');
  const errorTonnage = document.getElementById('errorTonnage');
  const errorAmountPaid = document.getElementById('errorAmountPaid');
  const errorBuyerName = document.getElementById('errorBuyerName');
  const errorSalesAgent = document.getElementById('errorSalesAgent');
  const errorBranch = document.getElementById('errorBranch');
  const errorDate = document.getElementById('errorDate');
  const errorTime = document.getElementById('errorTime');
  const errorTotalPayment = document.getElementById('errorTotalPayment');

  let errorCount = 0;

  // Validate Produce Name
  if (produceName.value === "") {
    produceName.style.border = "1px solid red";
    errorProduceName.textContent = "Select produce name";
    errorCount++;
  } else {
    produceName.style.border = "1px solid green";
    errorProduceName.textContent = "";
  }

  // Validate Produce Type
  if (produceType.value === "") {
    produceType.style.border = "1px solid red";
    errorProduceType.textContent = "Select produce type";
    errorCount++;
  } else {
    produceType.style.border = "1px solid green";
    errorProduceType.textContent = "";
  }

  // Validate Tonnage
  if (tonnage.value === "" || tonnage.value <= 0) {
    tonnage.style.border = "1px solid red";
    errorTonnage.textContent = "Enter a valid tonnage greater than 0";
    errorCount++;
  } else {
    tonnage.style.border = "1px solid green";
    errorTonnage.textContent = "";
  }

  // Validate Amount Paid
  if (amountPaid.value === "" || amountPaid.value < 5) {
    amountPaid.style.border = "1px solid red";
    errorAmountPaid.textContent = "Amount paid must be at least 5 UGX";
    errorCount++;
  } else {
    amountPaid.style.border = "1px solid green";
    errorAmountPaid.textContent = "";
  }

  // Validate Buyer Name
  if (buyerName.value.trim() === "" || buyerName.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(buyerName.value)) {
    buyerName.style.border = "1px solid red";
    errorBuyerName.textContent = "Buyer's name must be alpha-numeric and at least 2 characters";
    errorCount++;
  } else {
    buyerName.style.border = "1px solid green";
    errorBuyerName.textContent = "";
  }

  // Validate Sales Agent Name
  if (salesAgentName.value.trim() === "" || salesAgentName.value.length < 2 || !/^[a-zA-Z0-9\s]+$/.test(salesAgentName.value)) {
    salesAgentName.style.border = "1px solid red";
    errorSalesAgent.textContent = "Sales agent's name must be alpha-numeric and at least 2 characters";
    errorCount++;
  } else {
    salesAgentName.style.border = "1px solid green";
    errorSalesAgent.textContent = "";
  }

  // Validate Branch
  if (branch.value === "") {
    branch.style.border = "1px solid red";
    errorBranch.textContent = "Select branch";
    errorCount++;
  } else {
    branch.style.border = "1px solid green";
    errorBranch.textContent = "";
  }

  // Validate Date
  if (date.value === "") {
    date.style.border = "1px solid red";
    errorDate.textContent = "Select a date";
    errorCount++;
  } else {
    date.style.border = "1px solid green";
    errorDate.textContent = "";
  }

  // Validate Time
  if (time.value === "") {
    time.style.border = "1px solid red";
    errorTime.textContent = "Select a time";
    errorCount++;
  } else {
    time.style.border = "1px solid green";
    errorTime.textContent = "";
  }

  // Validate Total Payment
  if (totalPayment.value === "" || totalPayment.value <= 0) {
    totalPayment.style.border = "1px solid red";
    errorTotalPayment.textContent = "Enter a valid total payment greater than 0";
    errorCount++;
  } else {
    totalPayment.style.border = "1px solid green";
    errorTotalPayment.textContent = "";
  }

  // Prevent form submission if there are errors
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
    document.getElementById('date').value = dateStr;
    document.getElementById('time').value = timeStr;
  }
  
  // Call the function when the page loads
  window.onload = setCurrentDateTime;
  
  document.addEventListener('DOMContentLoaded', function () {
    // Function to update total cost
    function updateTotalCost() {
        let tonnage = parseFloat(document.getElementById("tonnage").value) || 0;
        let amountPaid = parseFloat(document.getElementById("amountPaid").value) || 0;
        let totalpaymentInput = document.getElementById("totalpayment");
        totalpaymentInput.value = tonnage * amountPaid;
    }

    // Add event listeners to both tonnage and cost inputs for real-time updates
    document.getElementById('tonnage').addEventListener("input", updateTotalCost);
    document.getElementById('amountPaid').addEventListener("input", updateTotalCost);
    
    // Initial calculation in case the fields have pre-filled values
    updateTotalCost();

    // Set total cost input to read-only
    document.getElementById('totalpayment').setAttribute('readonly', true);
})