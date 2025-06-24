console.log('Settings JS loaded');
console.log(document.querySelector('.theme'));

document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();

    document.getElementById('theme-switch').addEventListener('change', saveSettings);
    document.getElementById('notifications-switch').addEventListener('change', saveSettings);
    document.getElementById('animations-switch').addEventListener('change', saveSettings);
    document.getElementById('auto-save-switch').addEventListener('change', saveSettings);

    // When the theme switch is toggled
    document.getElementById('theme-switch').addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-theme');
            updateIconInverts(true);
        } else {
            document.body.classList.add('light-theme');
            updateIconInverts(false);
        }
        saveSettings(); // Save the theme state if you want persistence
    });

    // Auto-open last calculator if auto-save is enabled
    const { value } = await Capacitor.Plugins.Preferences.get({ key: 'userSettings' });
    let autoSave = false;
    if (value) {
        const settings = JSON.parse(value);
        autoSave = settings.autoSaveLastCalculator;
    }
    if (autoSave) {
        const { value: lastCalculator } = await Capacitor.Plugins.Preferences.get({ key: 'lastCalculatorUsed' });
        if (lastCalculator) {
            setTimeout(() => {
                const tile = document.querySelector(`.tile[data-name="${lastCalculator}"]`);
                if (tile) {
                    tile.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    showCalculator(lastCalculator, tile.querySelector('button'));
                }
            }, 300);
        }
    }
});

function updateIconInverts(isDarkMode) {
    // Select all relevant icon elements, regardless of current class
    document.querySelectorAll('.icon, .icon2, .sidebar-icon, .search-icon, .arrow, .flip, .favorite-icon').forEach(el => {
        if (isDarkMode) {
            el.classList.add('invert');
        } else {
            el.classList.remove('invert');
        }
    });
}

async function saveSettings() {
    const isDarkMode = document.getElementById('theme-switch').checked;
    const notificationsDisabled = document.getElementById('notifications-switch').checked;
    const animationsDisabled = document.getElementById('animations-switch').checked;
    const autoSaveLastCalculator = document.getElementById('auto-save-switch').checked;

    const settings = {
        darkMode: isDarkMode,
        notificationsDisabled: notificationsDisabled,
        animationsDisabled: animationsDisabled,
        autoSaveLastCalculator: autoSaveLastCalculator
    };

    document.body.classList.toggle('no-animations', animationsDisabled);

    await Capacitor.Plugins.Preferences.set({
        key: 'userSettings',
        value: JSON.stringify(settings)
    });
}

async function loadSettings() {
    const { value } = await Capacitor.Plugins.Preferences.get({ key: 'userSettings' });
    let darkMode = true; // default ON
    if (value) {
        const settings = JSON.parse(value);
        darkMode = settings.darkMode !== undefined ? settings.darkMode : true;
    }
    document.getElementById('theme-switch').checked = darkMode;
    if (darkMode) {
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
    }
    updateIconInverts(darkMode);

    let fontSize = 'medium'; // default
    if (value) {
        const settings = JSON.parse(value);

        document.getElementById('theme-switch').checked = settings.darkMode || false;
        document.getElementById('notifications-switch').checked = settings.notificationsDisabled || false;
        document.getElementById('animations-switch').checked = settings.animationsDisabled || false;
        document.getElementById('auto-save-switch').checked = settings.autoSaveLastCalculator || false;

        document.body.classList.toggle('no-animations', settings.animationsDisabled || false);

        if (settings.fontSize) {
            fontSize = settings.fontSize;
            // Update label
            const label = settings.fontSize.charAt(0).toUpperCase() + settings.fontSize.slice(1);
            document.querySelector('.font-label').textContent = label;
        }
    }
    applyFontSize(fontSize);
}

async function sendNotificationIfEnabled(notificationOptions) {
    const { value } = await Capacitor.Plugins.Preferences.get({ key: 'userSettings' });
    let notificationsDisabled = false;
    if (value) {
        const settings = JSON.parse(value);
        notificationsDisabled = settings.notificationsDisabled;
    }
    if (!notificationsDisabled) {
        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [notificationOptions]
        });
    }
}

document.querySelector('.font-size').addEventListener('click', function() {
    const popup = document.getElementById('font-size-popup');
    popup.style.display = 'block';
});

// Hide popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('font-size-popup');
    if (popup.style.display === 'block' && !popup.contains(e.target) && !e.target.closest('.font-size')) {
        popup.style.display = 'none';
    }
});

// Handle font size selection
document.querySelectorAll('#font-size-popup .popup-option').forEach(option => {
    option.addEventListener('click', async function() {
        const size = this.getAttribute('data-size');
        const label = this.textContent;
        document.querySelector('.font-label').textContent = label;
        applyFontSize(size);
        document.getElementById('font-size-popup').style.display = 'none';

        // Save the selection to settings
        const { value } = await Capacitor.Plugins.Preferences.get({ key: 'userSettings' });
        let settings = {};
        if (value) {
            settings = JSON.parse(value);
        }
        settings.fontSize = size;
        await Capacitor.Plugins.Preferences.set({
            key: 'userSettings',
            value: JSON.stringify(settings)
        });
    });
});

document.querySelector('.reset-settings').addEventListener('click', async function() {
    if (!confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
        return;
    }

    await Capacitor.Plugins.Preferences.remove({ key: 'userSettings' });
    await Capacitor.Plugins.Preferences.remove({ key: 'lastCalculatorUsed' });

    localStorage.removeItem('enabledCalculators');

    document.getElementById('theme-switch').checked = false;
    document.getElementById('notifications-switch').checked = false;
    document.getElementById('animations-switch').checked = false;
    document.getElementById('auto-save-switch').checked = false;
    document.body.classList.remove('no-animations', 'font-small', 'font-medium', 'font-large');
    document.querySelector('.font-label').textContent = 'Small';

    location.reload();
    await loadSettings();
    alert('Settings have been reset to default.');
});

function applyFontSize(size) {
    // Default (medium)
    let vars = {
        '--about-h2-size': '1.5rem',
        '--about-p-size': '1.0rem',
        '--base-font-size': '0.8rem',
        '--sidebar-font-size': '1.1rem',
        '--calculator-name-size': '1.15rem',
        '--disable-label-size': '1rem',
        '--manage-p-size': '1.1rem',
        '--manage-h2-size': '1.7rem',
        '--settings-h1-size': '1.2rem',
        '--settings-h2-size': '1.7rem',
        '--settings-p-size': '1.1rem',
        '--button-font-size': '1.2rem'
    };

    if (size === 'small') {
        vars = {
            '--about-h2-size': '1.4rem',
            '--about-p-size': '0.9rem',
            '--base-font-size': '0.7rem',
            '--sidebar-font-size': '1.0rem',
            '--calculator-name-size': '1.0rem',
            '--disable-label-size': '0.9rem',
            '--manage-p-size': '1.0rem',
            '--manage-h2-size': '1.4rem',
            '--settings-h1-size': '1.0rem',
            '--settings-h2-size': '1.4rem',
            '--settings-p-size': '1.0rem',
            '--button-font-size': '1.0rem'
        };
    } else if (size === 'large') {
        vars = {
            '--about-h2-size': '1.6rem',
            '--about-p-size': '1.1rem',
            '--base-font-size': '1.0rem',
            '--sidebar-font-size': '1.3rem',
            '--calculator-name-size': '1.3rem',
            '--disable-label-size': '1.2rem',
            '--manage-p-size': '1.3rem',
            '--manage-h2-size': '2.0rem',
            '--settings-h1-size': '1.5rem',
            '--settings-h2-size': '2.0rem',
            '--settings-p-size': '1.3rem',
            '--button-font-size': '1.5rem'
        };
    }

    for (const key in vars) {
        document.documentElement.style.setProperty(key, vars[key]);
    }
}

// Helper: Toggle switch and call the correct function
function setupSwitchToggle(divSelector, inputSelector, toggleFunction) {
    const div = document.querySelector(divSelector);
    const input = document.querySelector(inputSelector);

    // When clicking the div (but not the input), toggle the switch
    div.addEventListener('click', function(e) {
        if (e.target !== input) {
            input.checked = !input.checked;
            toggleFunction();
        }
    });

    // When clicking the input directly, just call the toggle function
    input.addEventListener('change', toggleFunction);
}

// Example toggle functions (replace with your actual logic)
function toggleTheme() {
    const isDark = document.getElementById('theme-switch').checked;
    if (isDark) {
        document.body.classList.remove('light-theme');
        updateIconInverts(true);
    } else {
        document.body.classList.add('light-theme');
        updateIconInverts(false);
    }
    saveSettings();
}
function toggleNotifications() { saveSettings(); }
function toggleAnimations() { saveSettings(); }
function toggleAutoSave() { saveSettings(); }

// Setup all switches
setupSwitchToggle('.theme.flex-div', '#theme-switch', toggleTheme);
setupSwitchToggle('.disable-notifications.flex-div', '#notifications-switch', toggleNotifications);
setupSwitchToggle('.disable-animations.flex-div', '#animations-switch', toggleAnimations);
setupSwitchToggle('.auto-save.flex-div', '#auto-save-switch', toggleAutoSave);