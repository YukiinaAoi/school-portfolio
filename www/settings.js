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

    document.getElementById('theme-switch').addEventListener('change', saveSettings);
    document.getElementById('notifications-switch').addEventListener('change', saveSettings);
    document.getElementById('animations-switch').addEventListener('change', saveSettings);
});

async function saveSettings() {
    const isDarkMode = document.getElementById('theme-switch').checked;
    const notificationsDisabled = document.getElementById('notifications-switch').checked;
    const animationsDisabled = document.getElementById('animations-switch').checked;

    const settings = {
        darkMode: isDarkMode,
        notificationsDisabled: notificationsDisabled,
        animationsDisabled: animationsDisabled,
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
    
        document.body.classList.toggle('no-animations', settings.animationsDisabled || false);
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