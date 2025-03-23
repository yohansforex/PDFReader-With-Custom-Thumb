import React, { useState } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share, Alert, TouchableWithoutFeedback } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Chapter from "./Chapter";
import Orientation from "react-native-orientation-locker";
import Note from "../Components/Note"; 

const Bottom = ({ onChapterPress, onClose, onToggleScroll }) => {
  const [isChapterModalVisible, setChapterModalVisible] = useState(false);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

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
    setChapterModalVisible(true);
  };

  const handleChapterSelect = (pageNumber) => {
    setChapterModalVisible(false);
    onChapterPress(pageNumber);
    onClose();
  };

  const handleToggleScroll = () => {
    onToggleScroll();
    onClose();
  };

  const handleNote = () => {
    setIsNoteVisible((prev) => !prev);
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
        <Card title="Horizontal/Vertical Scroll" icon="gesture-swipe-horizontal" color="blue" onPress={handleToggleScroll} />
        <Card title="Screen Orientation" icon="screen-rotation" color="blue" onPress={handleOrientation} />
        <Card title="Write Notes" icon="pen" color="blue" onPress={handleNote} />
        <Card title="Share" icon="share-variant" color="blue" onPress={() => Share.share({ message: "Share Handhuuraa Ormoo Arsi" })} />
        <Card title="More Apps" icon="apps" color="blue" onPress={() => Alert.alert("More Apps", "Coming Soon...")} />
      </View>

      {/* Chapter Selection Modal */}
      <Modal
        visible={isChapterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChapterModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setChapterModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.bottomSheet}>
                <Chapter onChapterPress={handleChapterSelect} />
              </View>
            </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Notes Modal */}
      <Modal
        visible={isNoteVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleNote}
      >
        <View style={styles.NoteContainer}>
          <View style={styles.NoteSheet}>
            <Note onBack={handleNote} />
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
  NoteContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.19)",
  },
  bottomSheet: {
    height: "60%",
    backgroundColor: "gainsboro",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },  
  NoteSheet: {
    height: "80%",
    backgroundColor: "gainsboro",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
});