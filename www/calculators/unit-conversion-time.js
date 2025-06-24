function timeConversion() {
    const from = document.getElementById('time-convert-select-1').value;
    const to = document.getElementById('time-convert-select-2').value;
    const input = document.getElementById('time-input');
    const result = document.getElementById('time-result');
    const msg = document.getElementById('time-result-msg');

    let value = parseFloat(input.value);

    if (isNaN(value)) {
        msg.textContent = "Please enter a valid number.";
        result.value = "";
        return;
    }

    // Conversion factors to seconds
    const toSeconds = {
        "seconds": 1,
        "minutes": 60,
        "hours": 3600,
        "days": 86400,
        "weeks": 604800,
        "months": 2629800, // average month (30.44 days)
        "years": 31557600  // average year (365.25 days)
    };

    // Convert input to seconds
    let valueInSeconds = value * toSeconds[from];

    // Convert seconds to target unit
    let output = valueInSeconds / toSeconds[to];

    result.value = output.toFixed(6);
    msg.textContent
}