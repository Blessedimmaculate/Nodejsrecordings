document.addEventListener("DOMContentLoaded", () => {
    const produceSelect = document.querySelector("#produceName");
    const tonnageInput = document.querySelector("#tonnage");
    const remainingTonnageSpan = document.querySelector("#remainingTonnage");

    produceSelect.addEventListener("change", async (event) => {
        const produceName = event.target.value;
        if (produceName) {
            try {
                const response = await fetch(`/produce/${produceName}`);
                const produce = await response.json();
                remainingTonnageSpan.textContent = produce.tonnage;
            } catch (error) {
                console.error("Failed to fetch produce data:", error);
            }
        }
    });

    tonnageInput.addEventListener("input", () => {
        const remainingTonnage = parseFloat(remainingTonnageSpan.textContent);
        const inputTonnage = parseFloat(tonnageInput.value);
        if (inputTonnage > remainingTonnage) {
            alert("Tonnage exceeds available amount!");
            tonnageInput.value = remainingTonnage;
        }
    });
});


// Function to set the current date and time
function setCurrentDateTime() {
    const now = new Date();
    // Format date as YYYY-MM-DD
    const dateStr = now.toISOString().split('T')[0];
    // Format time as HH:MM
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
  
    // Set the dateOfDispatch and time input fields
    document.getElementById('dateOfDispatch').value = dateStr;
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



// document.addEventListener("DOMContentLoaded", () => {
//     const produceSelect = document.querySelector("#produceName");
//     const tonnageInput = document.querySelector("#tonnage");
//     const remainingTonnageSpan = document.querySelector("#remainingTonnage");

//     produceSelect.addEventListener("change", async (event) => {
//         const produceName = event.target.value;
//         if (produceName) {
//             try {
//                 const response = await fetch(`/produce/${produceName}`);
//                 const produce = await response.json();
//                 remainingTonnageSpan.textContent = produce.tonnage;
//             } catch (error) {
//                 console.error("Failed to fetch produce data:", error);
//             }
//         }
//     });

//     tonnageInput.addEventListener("input", () => {
//         const remainingTonnage = parseFloat(remainingTonnageSpan.textContent);
//         const inputTonnage = parseFloat(tonnageInput.value);
//         if (inputTonnage > remainingTonnage) {
//             alert("Tonnage exceeds available amount!");
//             tonnageInput.value = remainingTonnage;
//         }
//     });
// });