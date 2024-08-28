// File: public/javascripts/validation.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("edit-sale-form");
  
    form.addEventListener("submit", (event) => {
      const saleTonnage = document.getElementById("tonnage").value;
      const amount = document.getElementById("amount").value;
      const buyerName = document.getElementById("buyername").value;
  
      let isValid = true;
  
      if (saleTonnage <= 0) {
        document.getElementById("tonnageErr").textContent = "Tonnage must be greater than zero.";
        isValid = false;
      } else {
        document.getElementById("tonnageErr").textContent = "";
      }
  
      if (amount <= 0) {
        document.getElementById("amountErr").textContent = "Amount must be greater than zero.";
        isValid = false;
      } else {
        document.getElementById("amountErr").textContent = "";
      }
  
      if (buyerName.trim() === "") {
        document.getElementById("buyernameErr").textContent = "Buyer's name is required.";
        isValid = false;
      } else {
        document.getElementById("buyernameErr").textContent = "";
      }
  
      if (!isValid) {
        event.preventDefault();  // Prevent form submission if validation fails
      }
    });
  });
  