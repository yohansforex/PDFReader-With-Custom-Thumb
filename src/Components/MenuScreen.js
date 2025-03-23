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
import Quotes from "./Quotes";
import { BlurView } from "@react-native-community/blur";

const { width } = Dimensions.get("window");

const MenuScreen = () => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPdfScreen, setShowPdfScreen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const colorScheme = useColorScheme();
  const [setQoute, setSetQoute] = useState(false);
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
  const handleQotes = () => {
    setSetQoute(!setQoute);
  };

  if(setQoute){
    return <Quotes onBack={handleQotes} />
  }
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
      title: "Open The Book",
      icon: "book-open-page-variant",
      onPress: toggleScreen,
    },
    {
      id: "2",
      title: "Add & Read Notes",
      icon: "pen", // Replacing image with icon
      onPress: handleNote,
    },
    {
      id: "3",
      title: "Book Quotes",
      icon: "heart-outline", // Replacing image with icon
      onPress: handleQotes,
    },
    {
      id: "4",
      title: "Settings",
      icon: "cog-outline", // Replacing image with icon
      onPress: () => setShowModal(true),
    },
  ];



  // Render each card
  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={item.onPress} style={styles.card}>
        <View style={[styles.cardBackground, { justifyContent: "center", alignItems: "center" }]}>
          <Icons name={item.icon} size={50} color="black" />
          <Text style={styles.iconText}>{item.title}</Text>
        </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    iconText: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: "midnightblue",
      textAlign: "center",

    },
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
      color: "linen",
      textAlign: "center",
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
      color: "linen",
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
      shadowColor: "white",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      margin: 10,
    },
    cardBackground: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 20,
      backgroundColor: "rgba(255, 255, 255, 0.42)",

    },
    spacer: {
      flex: 1,
    },
    gradientButton: {
      width: "100%",
      borderRadius: 20,
      shadowColor: "#000",
      marginBottom: 15,
      backgroundColor: "slateblue",
      marginBottom: 5,
    },
    gradient: {
      width: "100%",
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.04)",
    },
    buttonText: {
      fontSize: 13,
      fontWeight: "bold",
      color: "black",
    },
    cardList: {
      flex: 1,
      marginTop: 50,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        source={require("../../lasst.png")}
        style={styles.background}
        resizeMode="cover"
      >
      {/* <BlurView
        style={StyleSheet.absoluteFill}
        blurType="transparent" // Change to "dark" if needed
        blurAmount={1} // Adjust blur intensity
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.5)"
      /> */}
        <View style={styles.background}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleMenu} activeOpacity={0.7} style={styles.menuIcon}>
              <Icons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Handhuuraa Oromo Arsi</Text>
            <TouchableOpacity onPress={onShare} activeOpacity={0.7} style={styles.shareIcon}>
              <Icons name="share-variant-outline" size={24} color="white" />
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
        </View>
      </ImageBackground>
    </View>
    )}
export default MenuScreen;