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
