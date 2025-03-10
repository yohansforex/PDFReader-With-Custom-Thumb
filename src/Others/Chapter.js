import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Chapter = ({ onChapterPress }) => {
  const handleChapterPress = (chapterNumber) => {
    const pageNumber = getPageNumberForChapter(chapterNumber);
    onChapterPress(pageNumber);
  };

  // Example mapping: Chapter 1 → Page 20, Chapter 2 → Page 40, etc.
  const getPageNumberForChapter = (chapterNumber) => {
    return chapterNumber * 20;
  };

  return (
    <LinearGradient colors={["darkred", "black", "white"]} style={styles.container}>   
      <Text style={styles.title}>Select a Chapter</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {[...Array(10).keys()].map((_, index) => { // Creates 20 chapters
          const chapter = index + 1;
          return (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterButton}
              onPress={() => handleChapterPress(chapter)}
            >
              <Text style={styles.chapterButtonText}>Chapter {chapter}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
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
    color: "white",
  },
});