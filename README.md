# 🌦️ Weather App Mobile

This mobile application provides users with real-time weather information based on their current location and allows them to search for weather data in other cities.

## ✨ Features

- 🌍 **Current Weather**: Displays real-time temperature, humidity, wind speed, and other relevant weather data for the user's current location.
- 🔍 **Search Functionality**: Users can search for weather information in different cities.
- 📅 **7-Day Forecast**: Provides a week-long weather forecast.
- 🖥️ **User-Friendly Interface**: Clean and intuitive design for easy navigation.
- 🌙 **Dark Mode**: Supports dark mode for better usability in low-light conditions.

## 🛠 Technologies Used

- ⚛️ **Framework**: React Native
- 🗄 **State Management**: Redux
- 🌐 **Networking**: Axios for API calls
- 🎨 **Animations**: Lottie for smooth animations
- 💾 **Data Storage**: AsyncStorage for local data persistence

## 📥 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/weather-app-mobile.git
   cd weather-app-mobile
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up API Keys**:
   - Obtain an API key from a weather service provider (e.g., OpenWeatherMap).
   - Create a `.env` file in the root directory and add your API key:
     ```
     WEATHER_API_KEY=your_api_key_here
     ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   - Use a compatible emulator or physical device to test the application.

## 📌 Usage

- 🌍 **Viewing Current Weather**: Upon opening the app, grant location permissions to view the weather for your current location.
- 🔎 **Searching for a City**: Use the search bar to find weather information for other cities.
- 📊 **Viewing Forecast**: Swipe or navigate to the forecast section to see the 7-day weather outlook.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
