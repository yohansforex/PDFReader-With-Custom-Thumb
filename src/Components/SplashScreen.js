import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const fullText = "Welcome to Seenaa Oromoo Uummata Arsii"; // The full text to type
  const [displayedText, setDisplayedText] = useState(""); // State to hold the typed text
  const typingSpeed = 200; // Typing speed in milliseconds

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]); // Add one letter at a time
        index++;
      } else {
        clearInterval(interval); // Stop when all letters are displayed
        setTimeout(() => {
          onFinish(); // Move to the next screen after a delay
        }, 1000);
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [onFinish]);

  return (
    <ImageBackground
      source={require("../../splash.jpg")} // Ensure this image exists in the correct path
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden />
      <View style={styles.overlay}>
        <Text style={styles.title}>{displayedText}</Text>
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