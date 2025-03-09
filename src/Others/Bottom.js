import React from "react"; 
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Share, Alert, Modal } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Card = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => {
      console.log(`${title} button pressed`);
      if (onPress) onPress();
    }}>
      <Icons name={icon} size={30} color={color} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const handleShare = async () => {
  try {
    await Share.share({
      message: "Check out this awesome app! Download it here: https://your-app-link.com",
    });
  } catch (error) {
    Alert.alert("Error", "Unable to share the app.");
  }
};

const Bottom = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  const handleChapters = () => {
    Alert.alert("Chapters Clicked");

  };

  return (
    <LinearGradient colors={["darkred", "black", "white"]} style={styles.container}>
      <View style={styles.grid}>
          <Card title="Chapters" icon="menu-open" color="blue" onPress={handleChapters}/>
          <Card title="Horizontal/Vertical" icon="gesture-swipe-horizontal" color="blue" onPress={()=>Alert.alert("Horizontal/Vertical Clicked")}/>
          <Card title="Screen Orientation" icon="screen-rotation" color="blue" onPress={()=>Alert.alert("Screen Orientation Clicked")} />
          <Card title="Dark/Night Mode" icon="lightbulb" color={isDarkMode ? "black" : "blue"} onPress={()=>Alert.alert("Dark/Night Mode Clicked")} />
          <Card title="Share" icon="share-variant" color="blue" onPress={handleShare} />
          <Card title="More Apps" icon="apps" color="blue" onPress={()=>Alert.alert("More Apps Soon...")} />
      </View>
    </LinearGradient>
  );
};

export default Bottom;

// 🔹 Styles remain unchanged.



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, 
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  grid: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "30%", // Smaller width to fit
    height: 70, // Reduced height
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 10, // Smaller text
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomsheet: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});