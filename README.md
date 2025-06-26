**CalcBox** *Work-in-Progress*
A multi-functional calculator app designed to support various real-world computational needs such as number conversions, loan computations, unit measurements, and more. CalcBox is built for students, professionals, and everyday users, providing a mobile-friendly interface for quick and accurate calculations.

**Features**
- Multiple Calculators: Number conversions, loan calculations, unit measurements, and more.
- Favorites & Management: Mark calculators as favorites and enable/disable them as needed.
- Customizable Settings: Dark/light theme, font size, notifications, animations, and auto-save last calculator.
- Mobile-Ready: Responsive design for mobile and desktop.
- Persistent Preferences: User settings are saved locally.

**Getting Started**
Prerequisites
npm
Capacitor
Android Studio (for building APK)

**Installation**
Clone the repository:
  git clone https://github.com/your-username/every-calculator.git
  cd every-calculator
  
Install dependencies:
  npm install
  
Sync and open in Android Studio:
  npx cap sync android
  npx cap copy
  npx cap open android
  
**Build APK in Android Studio:**
- Use Build > Assemble 'app' Run Configuration to generate a debug APK.
- Find your APK at android/app/build/outputs/apk/debug/app-debug.apk.

**Usage**
- Open the app and select a calculator from the list.
- Use the settings page to customize your experience.
- Manage which calculators are enabled and set favorites for quick access.

