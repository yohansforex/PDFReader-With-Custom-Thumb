import React, { useState } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Chapter from "./Chapter"; // Ensure the name matches the export

const Bottom = () => {
  const [isChapterModalVisible, setChapterModalVisible] = useState(false);

  const handleChapters = () => {
    setChapterModalVisible(true); // Show the Chapters modal
  };

  const handleChapterSelect = (pageNumber) => {
    setChapterModalVisible(false); // Close the modal
    Alert.alert(`Chapter Selected`, `Navigating to page ${pageNumber}`); // Display alert
  };

  const Card = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icons name={icon} size={30} color={color} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["darkred", "black", "white"]} style={styles.container}>
      <View style={styles.grid}>
        <Card title="Chapters" icon="menu-open" color="blue" onPress={handleChapters} />
        <Card title="Horizontal/Vertical" icon="gesture-swipe-horizontal" color="blue" onPress={() => Alert.alert("Horizontal/Vertical Clicked")} />
        <Card title="Screen Orientation" icon="screen-rotation" color="blue" onPress={() => Alert.alert("Screen Orientation Clicked")} />
        <Card title="Dark/Night Mode" icon="lightbulb" color="yellow" onPress={() => Alert.alert("Dark/Night Mode Clicked")} />
        <Card title="Share" icon="share-variant" color="blue" onPress={() => Alert.alert("Share Clicked")} />
        <Card title="More Apps" icon="apps" color="blue" onPress={() => Alert.alert("More Apps Soon...")} />
      </View>

      {/* Modal for Chapters */}
      <Modal
        visible={isChapterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChapterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <Chapter onChapterPress={handleChapterSelect} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  grid: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "30%",
    height: 70,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    height: "40%", // Adjust height dynamically
    backgroundColor: "darkred",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
});
