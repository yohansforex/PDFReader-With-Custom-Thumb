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
  Share,
  Modal,
  Appearance,
  useColorScheme,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import PdfScreen from "./PdfScreen"; // Import your PdfScreen component
import Menus from "../Others/Menus";
import Note from "./Note";

const { width } = Dimensions.get("window");

const MenuScreen = () => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPdfScreen, setShowPdfScreen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const colorScheme = useColorScheme();

  // Share function
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share Handhuuraa Ormoo Arsi",
        url: "https://example.com",
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
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
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

  const toggleScreen = () => {
    setShowPdfScreen(!showPdfScreen);
  };

  const handleNote = () => {
    setIsNoteVisible((prev) => !prev);
  };

  if (isNoteVisible) {
    return <Note onBack={handleNote} />;
  }

  if (showPdfScreen) {
    return <PdfScreen onBack={toggleScreen} />;
  }

  // Data for cards
  const cards = [
    {
      id: "1",
      title: "Read The Book",
      image: require("../../cover.jpg"),
      onPress: toggleScreen,
    },
    {
      id: "2",
      title: "Add & Read Notes",
      image: require("../../notes.jpeg"),
      onPress: handleNote,
    },
    {
      id: "3",
      title: "Favorites Qoutes",
      image: require("../../favorite.png"),
      onPress: () => Alert.alert("Favorites", "Favorites feature coming soon!"),
    },
    {
      id: "4",
      title: "Settings",
      image: require("../../setting.png"),
      onPress: () => setShowModal(true), // Open the modal
    },
  ];

  // Render each card
  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={styles.card}>
        <ImageBackground
          source={item.image}
          style={styles.cardBackground}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.spacer} />
          <Animated.View
            style={[
              styles.gradientButton,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient colors={["blue", "black", "gray"]} style={styles.gradient}>
              <Text style={styles.buttonText}>{item.title}</Text>
            </LinearGradient>
          </Animated.View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    closeButton: {
      position: "absolute",
      top: 3,
      right: 3,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colorScheme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
    },
    bottomSheet: {
      height: "73%",
      backgroundColor: colorScheme === "dark" ? "#121212" : "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    menuIcon: {
      marginLeft: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 15,
      textShadowColor: "black",
    },
    shareIcon: {
      marginRight: 10,
    },
    titleContainer: {
      top: 60,
      alignItems: "center",
      width: "100%",
    },
    animatedTitle: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: colorScheme === "dark" ? "#FFFFFF" : "white",
      textShadowColor: colorScheme === "dark" ? "#000000" : "#8B0000",
      textShadowOffset: { width: 3, height: 3 },
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
      width: width * 0.4,
      height: 200,
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colorScheme === "dark" ? "#333333" : "#FFFFFF",
      margin: 10,
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
      width: "90%",
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 15,
    },
    gradient: {
      width: "100%",
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: "center",
    },
    buttonText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "white",
    },
    cardList: {
      flex: 1,
      marginTop: 50,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["navy","darkblue","blue","mediumblue", "dodgerblue", "cornflowerblue"]} style={styles.background}>
        <StatusBar hidden={false} />
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={handleMenu} activeOpacity={0.7} style={styles.menuIcon}>
          <Icons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Handhuuraa Oromo Arsi</Text>
        <TouchableOpacity onPress={onShare} activeOpacity={0.7} style={styles.shareIcon}>
          <Icons name="share-variant-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Animated.Text
            style={[styles.animatedTitle, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}
          >
            Welcome to Seenaa Oromoo Uummata Arsii
          </Animated.Text>
        </View>

        {/* Card List */}
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.cardList}
        />

        {/* Modal */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.bottomSheet}>
                <Menus />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </LinearGradient>
    </View>
  );
};

export default MenuScreen;