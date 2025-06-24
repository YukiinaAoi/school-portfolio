function calculateBMI() {
    const heightInput = document.getElementById('bmi-height');
    const weightInput = document.getElementById('bmi-weight');
    const resultInput = document.getElementById('bmi-result');
    const msg = document.getElementById('bmi-result-msg');

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        msg.textContent = "Please enter valid height and weight.";
        resultInput.value = "";
        return;
    }

    // BMI = weight (kg) / [height (m)]^2
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);

    resultInput.value = bmi.toFixed(2);

    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    msg.textContent = `Category: ${category}`;
}