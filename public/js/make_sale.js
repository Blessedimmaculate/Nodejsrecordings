document.addEventListener('DOMContentLoaded', () => {
  
    // Prepopulate the current time in the 'saleTime' input
    const timeSaleInput = document.querySelector('input[name="timeSale"]');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    timeSaleInput.value = formattedTime;
  
    // Prepopulate the current date in the 'dateSale' input
    const dateSaleInput = document.querySelector('input[name="dateSale"]');
    const formattedDate = now.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
    dateSaleInput.value = formattedDate;
  
    // Get the tonnage and cost per kg inputs and the total cost input
    const tonnageSaleInput = document.querySelector('input[name="tonnageSale"]');
    const produceCostInput = document.querySelector('input[name="produceCost"]');
    const amountPaidInput = document.querySelector('input[name="amountPaid"]');
  
    // Function to update the total cost field
    function updateTotalCost() {
      const tonnageSale = parseFloat(tonnageSaleInput.value) || 0; // Use 0 if value is empty or NaN
      const produceCost = parseFloat(produceCostInput.value) || 0; // Use 0 if value is empty or NaN
      const amountPaid = tonnageSale * produceCost;
      amountPaidInput.value = Math.floor(amountPaid); // Remove decimal points
    }
  
    // Add event listeners to the tonnage and cost per kg inputs
    tonnageSaleInput.addEventListener('input', updateTotalCost);
    produceCostInput.addEventListener('input', updateTotalCost);
  
    // Disable editing for total cost input
    amountPaidInput.setAttribute('readonly', true);
});
