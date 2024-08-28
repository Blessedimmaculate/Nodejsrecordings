document.getElementById('produceCost').addEventListener("change", function () {
    let tonnage = document.getElementById("tonnage").value;
    let produceCost = document.getElementById("produceCost").value;
    let totalCostInput = document.getElementById("totalCost");
    totalCostInput.value = tonnage*produceCost;
});