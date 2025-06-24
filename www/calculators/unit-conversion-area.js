function areaConversion() {
    const from = document.getElementById('area-convert-select-1').value;
    const to = document.getElementById('area-convert-select-2').value;
    const input = document.getElementById('area-input');
    const result = document.getElementById('area-result');
    const msg = document.getElementById('area-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    // Conversion factors to square meters
    const toSquareMeters = {
        "square-meters": 1,
        "square-kilometers": 1e6,
        "square-centimeters": 0.0001,
        "square-millimeters": 0.000001,
        "square-miles": 2.59e6,
        "square-yards": 0.836127,
        "square-feet": 0.092903,
        "square-inches": 0.00064516,
        "hectares": 10000,
        "acres": 4046.8564224
    };

    // Convert input to square meters
    let valueInSqMeters = value * toSquareMeters[from];

    // Convert square meters to target unit
    let output = valueInSqMeters / toSquareMeters[to];

    result.value = output.toFixed(6);
    msg.textContent = "";
}