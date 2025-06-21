function convertWeight() {
    const input = parseFloat(document.getElementById("input").value);
    const fromUnit = document.getElementById("convert-select-1").value;
    const toUnit = document.getElementById("convert-select-2").value;
    const resultElement = document.getElementById("result");
    const resultMsgElement = document.getElementById("result-msg");

    // Validate input
    if (isNaN(input)) {
        resultElement.value = "";
        resultMsgElement.textContent = "Invalid input! Please enter a numeric value.";
        return;
    }

    // Conversion rates relative to kilograms
    const conversionRates = {
        kilograms: 1,
        grams: 1000,
        milligrams: 1000000,
        pounds: 2.20462,
        ounces: 35.274,
        stones: 0.157473,
        tons: 0.00110231
    };

    // Validate units
    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        resultElement.value = "";
        resultMsgElement.textContent = "Invalid units! Please select valid units.";
        return;
    }

    // Perform conversion
    const valueInKilograms = input / conversionRates[fromUnit]; // Convert to kilograms
    const convertedValue = valueInKilograms * conversionRates[toUnit]; // Convert to target unit

    // Display result
    resultElement.value = convertedValue.toFixed(4); // Round to 4 decimal places
    resultMsgElement.textContent = ""; // Clear error message
}