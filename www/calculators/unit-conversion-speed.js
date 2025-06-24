function speedConversion() {
    const from = document.getElementById('speed-convert-select-1').value;
    const to = document.getElementById('speed-convert-select-2').value;
    const input = document.getElementById('speed-input');
    const result = document.getElementById('speed-result');
    const msg = document.getElementById('speed-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    // Conversion factors to meters per second
    const toMps = {
        "mps": 1,
        "kph": 1 / 3.6,
        "mph": 0.44704,
        "fps": 0.3048,
        "knots": 0.514444
    };

    // Convert input to meters per second
    let valueInMps = value * toMps[from];

    // Convert meters per second to target unit
    let output;
    if (to === "mps") output = valueInMps;
    else if (to === "kph") output = valueInMps * 3.6;
    else if (to === "mph") output = valueInMps / 0.44704;
    else if (to === "fps") output = valueInMps / 0.3048;
    else if (to === "knots") output = valueInMps / 0.514444;

    result.value = output.toFixed(6);
    msg.textContent = "";
}