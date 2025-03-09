import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Alert,
  Share,Modal
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import PdfScreen from "./PdfScreen"; // Import your PdfScreen component
import Menus from "../Others/Menus";

const MenuScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [showPdfScreen, setShowPdfScreen] = useState(false); // State to toggle between screens

  // Share function
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share Handhuuraa Ormoo Arsi", // Message to share
        url: "https://example.com", // Replace with your app's URL or store link
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleMenu = () => {
    setShowModal(true);

  };

  // Toggle between MenuScreen and PdfScreen
  const toggleScreen = () => {
    setShowPdfScreen(!showPdfScreen);
  };

  // Render PdfScreen if showPdfScreen is true
  if (showPdfScreen) {
    return <PdfScreen onBack={toggleScreen} />; // Pass the callback function
  }

  return (
    <LinearGradient colors={["darkred", "#000000", "#ffffff"]} style={styles.background}>
      <StatusBar hidden={false} />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenu}>
          <Icons name="menu" size={25} color="skyblue" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Handhuuraa Oromo Arsi</Text>
        <TouchableOpacity onPress={onShare} style={styles.shareIcon}>
          <Icons name="share-variant-outline" size={25} color="skyblue" />
        </TouchableOpacity>
      </View>

      {/* Welcome Text ABOVE the Card */}
      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.animatedTitle, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}
        >
          Welcome to Historical Oromo People Arsi
        </Animated.Text>
      </View>

      {/* Card View Below the Welcome Text */}
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ImageBackground
            source={require("../../cover.jpg")}
            style={styles.cardBackground}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
          >
            {/* Pushes Button Lower */}
            <View style={styles.spacer} />

            {/* Gradient Button */}
            <LinearGradient colors={["darkred", "black", "gray"]} style={styles.gradientButton}>
              <TouchableOpacity style={styles.button} onPress={toggleScreen}>
                <Text style={styles.buttonText}>Open The Book</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View>
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <Menus/>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Icons name="close" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    height: "75%", // Adjust height dynamically
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a background color for better visibility
  },
  menuIcon: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "skyblue",
    textAlign: "center",
    flex: 1, // Ensures the title is centered
  },
  shareIcon: {
    marginRight: 10,
  },
  titleContainer: {
    position: "absolute",
    top: 60, // Adjusted to avoid overlapping with the header
    alignItems: "center",
    width: "100%",
  },
  animatedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "whitesmoke",
    textShadowColor: "#8B0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 60,
  },
  card: {
    width: "80%",
    height: 380,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  spacer: {
    flex: 1,
  },
  gradientButton: {
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "skyblue",
  },
});

export default MenuScreen;