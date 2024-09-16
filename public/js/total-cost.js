document.addEventListener('DOMContentLoaded', () => {
  
    // Prepopulate the current time in the 'saleTime' input
    const timeInput = document.querySelector('input[name="time"]');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    timeInput.value = formattedTime;
  
    // Prepopulate the current date in the 'saledate' input
    const dateInput = document.querySelector('input[name="date"]');
    const formattedDate = now.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
    dateInput.value = formattedDate;
  
    // Get the tonnage and cost per kg inputs and the total cost input
    const tonnageInput = document.querySelector('input[name="tonnage"]');
    const produceCostInput = document.querySelector('input[name="produceCost"]');
    const totalcostInput = document.querySelector('input[name="totalcost"]');
  
    // Function to update the total cost field
    function updateTotalCost() {
      const tonnage = parseFloat(tonnageInput.value) || 0; // Use 0 if value is empty or NaN
      const produceCost = parseFloat(produceCostInput.value) || 0; // Use 0 if value is empty or NaN
      const totalcost = tonnage * produceCost;
      totalcostInput.value = Math.floor(totalcost); // Remove decimal points
    }
  
    // Add event listeners to the tonnage and cost per kg inputs
    tonnageInput.addEventListener('input', updateTotalCost);
    produceCostInput.addEventListener('input', updateTotalCost);
  
    // Disable editing for total cost input
    totalcostInput.setAttribute('readonly', true);
});
