import React, { useState } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";

const quotes = [
    {
      text: "Oromoon waa lama jechuun Lafaa fi eenyumaa isaa yoo jalaa tuqan; Obsa hin qabu akkuma qeerransaa utaalee mataa diinaa irra bu’a.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      text: "Oromoon yoo tuqan malee nama hin tuqu, Oromoon saba kiyya ta’eefi miti, sheleef hin jenne.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      text: "Nama qalqala qabutu garbuu kadhata.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Farda sangaa ta’u haada irratti beeku.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Dhugaan ilmoo Rabbiiti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Osoo hin madaalin waldhaansoo hin bayin.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Gumaan seerri Gadaa ittiin murteessituu seera uumamaa dha.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Araarri danuu qulqulleessuf godhamu, tokko jaarsi araaraa murteesse nagaya buusuudha.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Bitata wallaalanii gabayaa abaaran.",
      source: "Handhuuraa Oromoo Arsii, Page 289",
    },
    {
      text: "Abbaan mishaan haabubbuluu barnootan nama guddisaa, Ilmi mishaan haabubbuluu abbaa gurra muldhisa.",
      source: "Handhuuraa Oromoo Arsii, Page 441",
    },
    {
      text: "Abbaan tulluudha, Ilmi muka tulluu irraati.",
      source: "Handhuuraa Oromoo Arsii, Page 441",
    },
    {
      text: "Seerri sirna Gadaa heera uumama waaqaa fi lafaa irraa ka’eeti.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Nama kufe ol qabee aannan itti qaba; yoo aannan hin jirree bishaan itti qaba.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      text: "Yoo waliin jiraatan amala walii baru.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Amalli hin dhiisu, gaarri hin godaanu.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Kan amala gaarii qabu hunda waliin jiraata.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Hantuunni amala qabdu abbaa warraa waliin nyaatti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Dhugaa fi tikseen galgala galti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Waaben eessaa dabe jennaan; Ilka-muummee.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Nama beelaye garaa itti jabaate hin beeku.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Oromoon yoo tuqamee malee nama hin tuqu.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Dabaan buluun bultii hin tahu.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Lafarraa buruqxu malee urjii hin tuqan.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Nama malee, safuu fi seerri lafa guddisan.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Intala jibbantu ilma dhalaa, ilma jibbantu ardaa dhaala.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Amalaa fi Adurreen diinqa bulti.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Araarri waanyoon keessa jirtu woyyaa taati malee fayyaa hin taatu.",
      source: "Handhuuraa Oromoo Arsii, Page 473",
    },
    {
      text: "Qadhaaba ceem’an keessa jirtu woyyaa taati malee fayyaa hin taatu.",
      source: "Handhuuraa Oromoo Arsii, Page 473",
    },
    {
      text: "Bishaan deemsaan malee, Fardi sangaan deemsaan male, Hayyichi/aalimni deemsaan male.",
      source: "Handhuuraa Oromoo Arsii, Page 474",
    },
    {
      text: "Dubartiin teessumaan malte, Ibiddi teessumaan male, Kinniisni teessumaan male.",
      source: "Handhuuraa Oromoo Arsii, Page 474",
    },
  ];  

const Quotes = ({ onBack }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icons name="arrow-left" size={30} color="darkblue" />
        </TouchableOpacity>
        <Text style={styles.header}> Quotes from Book</Text>
      </View>

      {/* Scrollable Quotes List */}
      <ScrollView style={styles.quoteList}>
        {quotes.map((quote, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedQuote(quote)}>
            <View style={styles.quoteContainer}>
              <Icons name="format-quote-close" size={20} color="black" />
              <Text style={styles.quoteText}>{quote.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Quote Details */}
      {selectedQuote && (
        <Modal transparent visible={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setSelectedQuote(null)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalQuote}>{selectedQuote.text}</Text>
              <Text style={styles.modalSource}>{selectedQuote.source}</Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "darkblue",
  },
  quoteList: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "mintcream",
  },
  quoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalQuote: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "darkred",
  },
  modalSource: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
  },
});

export default Quotes;