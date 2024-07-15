# Appdeptus

Appdeptus is an unofficial companion app for Warhammer 40,000, built using the Expo. It provides a range of features to enhance your Warhammer 40,000 experience, including army building, game score tracking and more.

## Getting Started

Follow these steps to get Appdeptus running on your local device or simulator.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/) (LTS version recommended).
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/).
- You have installed either Xcode (for iOS) or Android Studio (for Android).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/appdeptus.git
   cd appdeptus
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the Expo prebuild command to generate the native project files:

   ```bash
   expo prebuild
   ```

### Running the App

#### On a Physical Device

Since Appdeptus requires a prebuild, you will need to build the app binaries and install them on your device. Follow these steps:

1. Build the app:

   ```bash
   expo run:android  # For Android
   expo run:ios      # For iOS
   ```

2. For iOS, ensure your device is connected to your macOS system. For Android, ensure your device is connected via USB with developer mode enabled.

3. Install the built app on your device by following the on-screen instructions from the Expo CLI.

#### On an iOS Simulator

1. Ensure you have Xcode installed on your macOS device.
2. Start the iOS simulator:

   ```bash
   open -a Simulator
   ```

3. Run the app:

   ```bash
   expo run:ios
   ```

#### On an Android Emulator

1. Ensure you have Android Studio installed and configured.
2. Start the Android emulator from Android Studio.
3. Run the app:

   ```bash
   expo run:android
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Disclaimer

Appdeptus is a fan-made project and is not affiliated with or endorsed by Games Workshop. Warhammer 40,000 and all associated trademarks are the property of Games Workshop. I do not own any of the brand or resources used within the app. All intellectual property related to Warhammer 40,000 is owned by Games Workshop. This app is intended for entertainment and informational purposes only.
