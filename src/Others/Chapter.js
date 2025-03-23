import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Chapter = ({ onChapterPress }) => {
  const handleChapterPress = (chapterNumber) => {
    const pageNumber = getPageNumberForChapter(chapterNumber);
    onChapterPress(pageNumber);
  };

  // Correct page mapping for each chapter
  const getPageNumberForChapter = (chapterNumber) => {
    const chapterPages = {
      1: 48,
      2: 81,
      3: 188,
      4: 277,
      5: 286,
      6: 363,
      7: 390,
      8: 439,
      9: 483,
      10: 533,
    };

    return chapterPages[chapterNumber] || 1; // Default to page 1 if chapter not found
  };

  return (
    <View style={styles.container}>   
      <Text style={styles.title}>Boqonnaa filadhu</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {[...Array(10).keys()].map((_, index) => { 
          const chapter = index + 1;

          return (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterButton}
              onPress={() => handleChapterPress(chapter)}
            >
              <Text style={styles.chapterButtonText}>Boqonna {chapter}: </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "black",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  scrollView: {
    width: "100%",
  },
  chapterButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  chapterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});