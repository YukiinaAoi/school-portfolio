function powerConversion() {
    const from = document.getElementById('power-convert-select-1').value;
    const to = document.getElementById('power-convert-select-2').value;
    const input = document.getElementById('power-input');
    const result = document.getElementById('power-result');
    const msg = document.getElementById('power-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    // Conversion factors to watts
    const toWatt = {
        "watt": 1,
        "kilowatt": 1000,
        "megawatt": 1000000,
        "horsepower": 745.699872,
        "btu-per-hour": 0.29307107,
        "calorie-per-second": 4.1868
    };

    // Convert input to watts
    let valueInWatt = value * toWatt[from];

    // Convert watts to target unit
    let output = valueInWatt / toWatt[to];

    result.value = output.toFixed(6);
    msg.textContent = "";
}