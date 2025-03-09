import React, { useState } from "react";
import { View } from "react-native";
import SplashScreen from "./src/Components/SplashScreen"; // Import your SplashScreen component
import MenuScreen from "./src/Components/MenuScreen"; // Import your MenuScreen component

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Callback function to hide the SplashScreen and show the MenuScreen
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <MenuScreen />
      )}
    </View>
  );
};

export default App;