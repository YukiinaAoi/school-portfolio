function convertLength() {
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

    // Conversion rates relative to meters
    const conversionRates = {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        inches: 39.3701,
        feet: 3.28084,
        yards: 1.09361,
        miles: 0.000621371
    };

    // Validate units
    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        resultElement.value = "";
        resultMsgElement.textContent = "Invalid units! Please select valid units.";
        return;
    }

    // Perform conversion
    const valueInMeters = input / conversionRates[fromUnit]; // Convert to meters
    const convertedValue = valueInMeters * conversionRates[toUnit]; // Convert to target unit

    // Display result
    resultElement.value = convertedValue; // Round to 4 decimal places
    resultMsgElement.textContent = ""; // Clear error message
}