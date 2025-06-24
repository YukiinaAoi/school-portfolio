function volumeConversion() {
    const from = document.getElementById('volume-convert-select-1').value;
    const to = document.getElementById('volume-convert-select-2').value;
    const input = document.getElementById('volume-input');
    const result = document.getElementById('volume-result');
    const msg = document.getElementById('volume-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    // Conversion factors to cubic meters
    const toCubicMeters = {
        "cubic-meters": 1,
        "liters": 0.001,
        "milliliters": 0.000001,
        "cubic-centimeters": 0.000001,
        "cubic-millimeters": 0.000000001,
        "cubic-inches": 0.000016387064,
        "cubic-feet": 0.0283168466,
        "cubic-yards": 0.764554858,
        "gallons": 0.00378541178,      // US liquid gallon
        "quarts": 0.00094635295,      // US liquid quart
        "pints": 0.000473176475,      // US liquid pint
        "cups": 0.000236588238,       // US legal cup
        "fluid-ounces": 0.0000295735  // US fluid ounce
    };

    // Convert input to cubic meters
    let valueInCubicMeters = value * toCubicMeters[from];

    // Convert cubic meters to target unit
    let output = valueInCubicMeters / toCubicMeters[to];

    result.value = output.toFixed(6);
    msg.textContent = "";
}