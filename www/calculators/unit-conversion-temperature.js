function temperatureConversion() {
    const from = document.getElementById('temperature-convert-select-1').value;
    const to = document.getElementById('temperature-convert-select-2').value;
    const input = document.getElementById('temperature-input');
    const result = document.getElementById('temperature-result');
    const msg = document.getElementById('temperature-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    let tempInCelsius;

    // Convert input to Celsius first
    if (from === "celsius") {
        tempInCelsius = value;
    } else if (from === "fahrenheit") {
        tempInCelsius = (value - 32) * 5 / 9;
    } else if (from === "kelvin") {
        tempInCelsius = value - 273.15;
    }

    let output;
    // Convert from Celsius to target unit
    if (to === "celsius") {
        output = tempInCelsius;
    } else if (to === "fahrenheit") {
        output = (tempInCelsius * 9 / 5) + 32;
    } else if (to === "kelvin") {
        output = tempInCelsius + 273.15;
    }

    result.value = output.toFixed(2);
    msg.textContent = "";
}