console.log('Settings JS loaded');
console.log(document.querySelector('.theme'));

document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();

    document.querySelector('.theme').addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            document.getElementById('theme-switch').click();
        }
    });
    document.querySelector('.disable-notifications').addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            document.getElementById('notifications-switch').click();
        }
    });
    document.querySelector('.disable-animations').addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            document.getElementById('animations-switch').click();
        }
    });
    document.querySelector('.auto-save').addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            document.getElementById('auto-save-switch').click();
        }
    });

    document.getElementById('theme-switch').addEventListener('change', saveSettings);
    document.getElementById('notifications-switch').addEventListener('change', saveSettings);
    document.getElementById('animations-switch').addEventListener('change', saveSettings);
    document.getElementById('auto-save-switch').addEventListener('change', saveSettings);

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

    if (value) {
        const settings = JSON.parse(value);

        document.getElementById('theme-switch').checked = settings.darkMode || false;
        document.getElementById('notifications-switch').checked = settings.notificationsDisabled || false;
        document.getElementById('animations-switch').checked = settings.animationsDisabled || false;
        document.getElementById('auto-save-switch').checked = settings.autoSaveLastCalculator || false;

        document.body.classList.toggle('no-animations', settings.animationsDisabled || false);

        // Apply saved font size
        if (settings.fontSize) {
            document.body.classList.remove('font-small', 'font-medium', 'font-large');
            document.body.classList.add('font-' + settings.fontSize);
            // Update label
            const label = settings.fontSize.charAt(0).toUpperCase() + settings.fontSize.slice(1);
            document.querySelector('.font-label').textContent = label;
        }
    }
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
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add('font-' + size);
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