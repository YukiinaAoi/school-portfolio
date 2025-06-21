window.onload = loadSettings();

function saveSettings() {
    const theme = document.getElementById("theme-switch").checked ? "dark" : "light";
    const notifications = document.getElementById("notifications-switch").checked;
    const animations = document.getElementById("animations-switch").checked;

    const settings = {
        theme: theme,
        notifications: notifications,
        animations: animations
    };

    fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
    })
    .then(res => res.text())
    .then(msg => console.log(msg))
    .catch(err => console.error('Error saving settings:', err));
}

function loadSettings() {
    fetch('/api/settings')
        .then(res => res.json())
        .then(settings => {
            document.getElementById("theme-switch").checked = (settings.theme === "dark");
            document.getElementById("notifications-switch").checked = !!settings.notifications;
            document.getElementById("animations-switch").checked = !!settings.animations;
        })
        .catch(err => console.error('Error loading settings:', err));
}

function toggleTheme() {
    var themeToggled = document.getElementById("theme-switch");

    if (themeToggled.checked) {
        themeToggled.checked = false;
    } else {
        themeToggled.checked = true;
    }
    saveSettings();
}

function toggleNotifications() {
    var notificationsToggled = document.getElementById("notifications-switch");

    if (notificationsToggled.checked) {
        notificationsToggled.checked = false;
    } else {
        notificationsToggled.checked = true;
    }
    saveSettings();
}

function toggleAnimations() {
    var animationsToggled = document.getElementById("animations-switch");

    if (animationsToggled.checked) {
        animationsToggled.checked = false;
    } else {
        animationsToggled.checked = true;
    }
    saveSettings();
}