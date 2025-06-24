const calculators = [
    { id: "number-conversions", label: "Number Conversions" },
    { id: "unit-conversion-length", label: "Length Unit Conversion" },
    { id: "unit-conversion-weight", label: "Weight Unit Conversion" },
    { id: "unit-conversion-temperature", label: "Temperature Unit Conversion" },
    { id: "unit-conversion-volume", label: "Volume Unit Conversion" }, 
    { id: "unit-conversion-area", label: "Area Unit Conversion" },
    { id: "unit-conversion-speed", label: "Speed Unit Conversion" },
    { id: "unit-conversion-time", label: "Time Unit Conversion" },
    { id: "unit-conversion-power", label: "Power Unit Conversion" },
    { id: "bmi-calculator", label: "BMI Calculator" },
];

function showCalculator(name, buttonElement) {
  const tile = buttonElement.parentElement;
  const calculatorContent = tile.querySelector('.calculator-content');
  const isExpanded = tile.classList.contains('expanded');

  if (isExpanded) {
    tile.classList.remove('expanded');
    calculatorContent.innerHTML = '';
  } else {
    tile.classList.add('expanded');

    fetch(`calculators/${name}.html`)
      .then(response => response.text())
      .then(data => {
        calculatorContent.innerHTML = data;

        requestAnimationFrame(() => {
          calculatorContent.classList.add('visible');
        });

        const script = document.createElement('script');
        script.src = `calculators/${name}.js`;
        document.body.appendChild(script);
      })
      .catch(err => console.error('Error loading calculator:', err));
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("background-overlay");

  const isSidebarOpen = sidebar.style.left === "0px";

  if (isSidebarOpen) {
    sidebar.style.left = "-300px";
    overlay.style.display = "none";
  } else {
    sidebar.style.left = "0px";
    overlay.style.display = "block";
  }
}

function toggleSettings() {
    const settingsPage = document.getElementById("settings-page");
    
    const isVisible = settingsPage.style.right === "0px";

    if (isVisible) {
        settingsPage.style.right = "-150%";
    } else {
        settingsPage.style.right = "0px";
    }
}

function toggleAbout() {
    const aboutPage = document.getElementById("about-page");

    const isVisible = aboutPage.style.right === "0px";

    if (isVisible) {
        aboutPage.style.right = "-150%";
    } else {
        aboutPage.style.right = "0px";
    }
}

// Store enabled/disabled state in localStorage for demo (replace with Preferences for production)
function getEnabledCalculators() {
    const stored = localStorage.getItem('enabledCalculators');
    if (stored) return JSON.parse(stored);
    // Default: all enabled
    return calculators.map(c => c.id);
}

function setEnabledCalculators(list) {
    localStorage.setItem('enabledCalculators', JSON.stringify(list));
}

// Render Manage Calculators List
function renderManageCalculators() {
    const enabledCalculators = getEnabledCalculators();
    const list = document.querySelector('.calculator-list');
    if (!list) return;
    list.innerHTML = '<p>Available Calculators</p>';

    calculators.forEach(calc => {
        const item = document.createElement('div');
        item.className = 'calculator-item';

        item.innerHTML = `
            <img src="media/favorite.png" class="favorite-icon invert" alt="Favorite">
            <span class="calculator-name">${calc.label}</span>
            <label class="disable-label">
                <input type="checkbox" class="disable-checkbox" onchange="toggleCalculatorEnabled('${calc.id}', this.checked)" ${enabledCalculators.includes(calc.id) ? '' : 'checked'}>
                <span>Disable</span>
            </label>
        `;
        list.appendChild(item);
    });
}

// Enable/Disable calculator
function toggleCalculatorEnabled(calculatorId, isDisabled) {
    let enabledCalculators = getEnabledCalculators();
    if (isDisabled) {
        enabledCalculators = enabledCalculators.filter(id => id !== calculatorId);
    } else {
        if (!enabledCalculators.includes(calculatorId)) {
            enabledCalculators.push(calculatorId);
        }
    }
    setEnabledCalculators(enabledCalculators);
    renderCalculators();
}

// Update renderCalculators to use enabledCalculators from storage
function renderCalculators() {
    const container = document.getElementById('calculator-container');
    container.innerHTML = "";

    const enabledCalculators = getEnabledCalculators();
    calculators.forEach(calc => {
        if (enabledCalculators.includes(calc.id)) {
            const tile = document.createElement('div');
            tile.className = "tile";
            tile.setAttribute("data-name", calc.id);

            tile.innerHTML = `
                <button onclick="showCalculator('${calc.id}', this)">${calc.label}</button>
                <div class="calculator-content"></div>
            `;
            container.appendChild(tile);
        }
    });
}

// Re-render manage page when opened
function toggleManage() {
    const managePage = document.getElementById("manage-page");
    const isVisible = managePage.style.right === "0px";

    if (isVisible) {
        managePage.style.right = "-150%";
    } else {
        renderManageCalculators();
        managePage.style.right = "0px";
    }
}

function searchTiles() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const tiles = document.querySelectorAll('#calculator-container .tile');
    tiles.forEach(tile => {
        const label = tile.querySelector('button').textContent.toLowerCase();
        if (label.includes(query)) {
            tile.style.display = '';
        } else {
            tile.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', renderCalculators);