function validateForm() {
  // Select form elements
  const produceName = document.getElementById('produceName');
  const produceType = document.getElementById('produceType');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const stock = document.getElementById('stock');
  const cost = document.getElementById('cost');
  const totalcost = document.getElementById('totalcost');
  const price = document.getElementById('price');
  const dealerName = document.getElementById('dealerName');
  const branch = document.getElementById('branch');
  const contact = document.getElementById('contact');

  // Select error elements
  const errorProduceName = document.getElementById('errorProduceName');
  const errorProduceType = document.getElementById('errorProduceType');
  const errorDate = document.getElementById('errorDate');
  const errorTime = document.getElementById('errorTime');
  const errorStock = document.getElementById('errorStock');
  const errorCost = document.getElementById('errorCost');
  const errorTotalCost = document.getElementById('errorTotalCost');
  const errorPrice = document.getElementById('errorPrice');
  const errorDealerName = document.getElementById('errorDealerName');
  const errorBranch = document.getElementById('errorBranch');
  const errorContact = document.getElementById('errorContact');

  let errorCount = 0;

  // Validate produceName
  if (produceName.value === "") {
      produceName.style.border = "1px solid red";
      errorProduceName.textContent = "Enter produce name";
      errorCount++;
  } else if (!/^[a-zA-Z0-9\s]+$/.test(produceName.value)) {
      produceName.style.border = "1px solid red";
      errorProduceName.textContent = "Produce name must be alpha-numeric";
      errorCount++;
  } else {
      produceName.style.border = "1px solid green";
      errorProduceName.textContent = "";
  }

  // Validate produceType
  if (produceType.value === "") {
      produceType.style.border = "1px solid red";
      errorProduceType.textContent = "Enter produce type";
      errorCount++;
  } else if (produceType.value.length < 2) {
      produceType.style.border = "1px solid red";
      errorProduceType.textContent = "Produce type must be 2 letters";
      errorCount++;
  } else {
      produceType.style.border = "1px solid green";
      errorProduceType.textContent = "";
  }

  // // Validate date
  // if (date.value === "") {
  //     date.style.border = "1px solid red";
  //     errorDate.textContent = "Date cannot be empty";
  //     errorCount++;
  // } else {
  //     date.style.border = "1px solid green";
  //     errorDate.textContent = "";
  // }

  // // Validate time
  // if (time.value === "") {
  //     time.style.border = "1px solid red";
  //     errorTime.textContent = "Time cannot be empty";
  //     errorCount++;
  // } else {
  //     time.style.border = "1px solid green";
  //     errorTime.textContent = "";
  // }

  // Validate stock (tonnage)
  if (stock.value === "" || isNaN(stock.value) || stock.value.length < 3) {
      stock.style.border = "1px solid red";
      errorStock.textContent = "Tonnage must 3 figures";
      errorCount++;
  } else {
      stock.style.border = "1px solid green";
      errorStock.textContent = "";
  }

  // Validate cost
  if (cost.value === "" || isNaN(cost.value) || cost.value.length < 3) {
      cost.style.border = "1px solid red";
      errorCost.textContent = "Cost must be above 2 figures";
  if (cost.value === "" || isNaN(cost.value) || cost.value.length < 5) {
      cost.style.border = "1px solid red";
      errorCost.textContent = "Cost must be 5 figures";
      errorCount++;
  } else {
      cost.style.border = "1px solid green";
      errorCost.textContent = "";
  }

  // // Validate totalcost
  // if (totalcost.value === "" || isNaN(totalcost.value)) {
  //     totalcost.style.border = "1px solid red";
  //     errorTotalCost.textContent = "Total cost must be numeric and not empty";
  //     errorCount++;
  // } else {
  //     totalcost.style.border = "1px solid green";
  //     errorTotalCost.textContent = "";
  // }

  // Validate price
  if (price.value === "" || isNaN(price.value)) {
      price.style.border = "1px solid red";
      errorPrice.textContent = "Enter Selling price";
      errorCount++;
  } else {
      price.style.border = "1px solid green";
      errorPrice.textContent = "";
  }

  // Validate dealerName
  if (dealerName.value === "" || !/^[a-zA-Z0-9\s]+$/.test(dealerName.value) || dealerName.value.length < 2) {
      dealerName.style.border = "1px solid red";
      errorDealerName.textContent = "Dealer name must be 2 letters";
      errorCount++;
  } else {
      dealerName.style.border = "1px solid green";
      errorDealerName.textContent = "";
  }

  // Validate branch
  if (branch.value === "") {
      branch.style.border = "1px solid red";
      errorBranch.textContent = "Enter store branch";
      errorCount++;
  } else {
      branch.style.border = "1px solid green";
      errorBranch.textContent = "";
  }

  // Validate contact
  if (contact.value === "" || !/^\d{10}$/.test(contact.value)) {
      contact.style.border = "1px solid red";
      errorContact.textContent = "Contact must be 10 digits";
      errorCount++;
  } else {
      contact.style.border = "1px solid green";
      errorContact.textContent = "";
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
        let stock = parseFloat(document.getElementById("stock").value) || 0;
        let cost = parseFloat(document.getElementById("cost").value) || 0;
        let totalcostInput = document.getElementById("totalcost");
        totalcostInput.value = stock * cost;
    }

    // Add event listeners to both stock and cost inputs
    document.getElementById('stock').addEventListener("input", updateTotalCost);
    document.getElementById('cost').addEventListener("input", updateTotalCost);
    
    // Initial calculation in case the fields have pre-filled values
    updateTotalCost();

    // Set total cost input to read-only
    document.getElementById('totalcost').setAttribute('readonly', true);
})};
