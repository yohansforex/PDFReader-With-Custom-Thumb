import React, { useState, useEffect } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Chapter from "./Chapter";
import Orientation from "react-native-orientation-locker";

const Bottom = ({ onChapterPress, onClose, onToggleScroll }) => {
  const [isChapterModalVisible, setChapterModalVisible] = useState(false);

  // Toggle between portrait and landscape
  const handleOrientation = () => {
    Orientation.getOrientation((orientation) => {
      if (orientation === "PORTRAIT") {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
    });
    onClose();
  };

  const handleChapters = () => {
    setChapterModalVisible(true); // Show the Chapters modal
  };

  const handleChapterSelect = (pageNumber) => {
    setChapterModalVisible(false); // Close chapter modal
    onChapterPress(pageNumber); // Navigate to selected page
    onClose(); // Close Bottom modal as well
  };

  const HorizontalScroll = () => {
    onToggleScroll();
    onClose();
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
        <Card title="Horizontal/Vertical Scroll" icon="gesture-swipe-horizontal" color="blue" onPress={HorizontalScroll} />
        <Card title="Screen Orientation" icon="screen-rotation" color="blue" onPress={handleOrientation} />
        <Card title="Dark/Night Mode" icon="lightbulb" color="yellow" onPress={() => {}} />
        <Card title="Share" icon="share-variant" color="blue" onPress={() => { Share.share({ message: "Share Handhuuraa Ormoo Arsi" }); }} />
        <Card title="More Apps" icon="apps" color="blue" onPress={() => {}} />
      </View>

      {/* Chapter Selection Modal */}
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
    height: 80,
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
    height: "40%",
    backgroundColor: "darkred",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
});