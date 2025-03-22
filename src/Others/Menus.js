import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Share,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({ title, icon, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icons name={icon} size={25} color={color} />
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

const handleRate = () => {
  Alert.alert("Rate Us", "Thank you for rating us!");
};

const handleEmail = () => {
  const email = "Ebroseta50@gmail.com";
  Linking.openURL(`mailto:${email}`).catch(() =>
    Alert.alert("Error", "Unable to open email client.")
  );
};

const handlePhoneCall = () => {
  const phoneNumber = "+16515002991";
  Linking.openURL(`tel:${phoneNumber}`).catch(() =>
    Alert.alert("Error", "Unable to open phone dialer.")
  );
};

const Menus = () => {
  return (
    <LinearGradient colors={["darkred", "black", "white"]} style={styles.container}>
      {/* Cover Image Card */}
      <View style={styles.coverCard}>
        <Image
          source={require("../../cover.jpg")} // Ensure the image exists
          style={styles.coverImage}
          resizeMode="contain" // Ensures the image fits without distortion
        />
        <Text style={styles.bookTitle}>Handhuuraa Oromo Arsi</Text>
        <Text style={styles.bookSubTitle}>Barressan: Ibroo Wolyyii (A.G)</Text>
        <Text style={styles.bookSubTitle2}>Developer: Yohannes (Yoh)</Text>
      </View>

      {/* Grid of Cards */}
      <View style={styles.grid}>
        <Card
          title="Contact Author"
          icon="contacts"
          color="blue"
          onPress={() =>
            Alert.alert(
              "Contact Information",
              `Barressan: Ibroo Woliyyii (A.G)\nMinosootaa (USA)\n✉️ Email: Ebroseta50@gmail.com\n📞 Phone: +16515002991`,
              [
                { text: "Send Email", onPress: handleEmail },
                { text: "Make Call", onPress: handlePhoneCall },
                { text: "Cancel", style: "cancel" },
              ]
            )
          }
        />
        <Card
          title="About Us"
          icon="information-outline"
          color="blue"
          onPress={() => Alert.alert("Developer", "Name: Yohannes (Yoh) \n Telegram: @Yon_fx")}
        />
        <Card
          title="Privacy Policy"
          icon="shield-lock-outline"
          color="blue"
          onPress={() => Alert.alert("Privacy Policy", "This app does not collect any user data.")}
        />
        <Card title="Share" icon="share-variant" color="blue" onPress={handleShare} />
        <Card title="Rate Us" icon="star-half-full" color="blue" onPress={handleRate} />
        <Card
          title="Update"
          icon="update"
          color="blue"
          onPress={() => Alert.alert("Update", "This app is up to date.")}
        />
      </View>
    </LinearGradient>
  );
};

export default Menus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  coverCard: {
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  coverImage: {
    width: "100%", // Adjust width to fit the card
    height: 150, // Adjust height to fit the card
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  bookSubTitle: {
    fontSize: 15,
    color: "white",
    marginTop: 3,
    textAlign: "center",
  },  bookSubTitle2: {
    fontSize: 13,
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  grid: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "30%", // Smaller width to fit
    height: 75, // Adjusted height
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 12, // Adjusted text size
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "black",
  },
});