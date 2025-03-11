import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar } from "react-native";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    // Set a timeout to call the onFinish callback after 3 seconds
    const timer = setTimeout(() => {
      onFinish(); // Call the callback function
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground
      source={require("../../coverpage.jpg")} // Ensure the image exists
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Seenaa Oromoo Uummata Arsii </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },
});

export default SplashScreen;