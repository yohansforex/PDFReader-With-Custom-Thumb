import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const Note = ({ onBack }) => {
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]); // Initialize as an empty array
  const [selectedColor, setSelectedColor] = useState("#f9f9f9"); // Default color

  // Load Notes on Start
  useEffect(() => {
    loadNotes();
  }, []);

  // Save Notes to Storage
  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      setFilteredNotes(newNotes); // Update filteredNotes as well
    } catch (error) {
      Alert.alert("Error", "Failed to save notes.");
    }
  };

  // Load Notes from Storage
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        setFilteredNotes(parsedNotes); // Initialize filteredNotes with loaded notes
      } else {
        setNotes([]); // Ensure notes is always an array
        setFilteredNotes([]); // Ensure filteredNotes is always an array
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load notes.");
    }
  };

  // Save Note
  const onSaveNote = useCallback(() => {
    if (!title || !text) {
      Alert.alert("Missing Information", "Please enter both a title and note.");
      return;
    }

    let updatedNotes = [...notes];

    if (selectedIndex !== null) {
      updatedNotes[selectedIndex] = { title, content: text, color: selectedColor };
    } else {
      updatedNotes.push({ title, content: text, color: selectedColor });
    }

    saveNotes(updatedNotes);
    setNoteModalOpen(false);
    setSelectedIndex(null);
    setTitle("");
    setText("");
  }, [title, text, notes, selectedColor]);

  // Edit Note
  const onNotePress = (index) => {
    setSelectedIndex(index);
    setTitle(notes[index].title);
    setText(notes[index].content);
    setSelectedColor(notes[index].color || "#f9f9f9"); // Fallback to default color
    setNoteModalOpen(true);
  };

  // Delete Note
  const onDeleteNote = (index) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          const updatedNotes = notes.filter((_, i) => i !== index);
          saveNotes(updatedNotes);
        },
      },
    ]);
  };

  // Search Notes
  useEffect(() => {
    if (searchText) {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchText.toLowerCase()) ||
            note.content.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(notes); // Ensure filteredNotes is always an array
    }
  }, [searchText, notes]);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icons name="keyboard-backspace" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add and Read Notes</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search Notes"
              placeholderTextColor="gray"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icons name="magnify" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.notesContainer}>
          {filteredNotes.map((note, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onNotePress(index)}
              onLongPress={() => onDeleteNote(index)}
            >
              <View style={[styles.note, { backgroundColor: note.color || "#f9f9f9" }]}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text numberOfLines={2} style={styles.noteContent}>{note.content}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.addNoteContainer}>
        <Button title="Add Note" onPress={() => { setTitle(""); setText(""); setNoteModalOpen(true); }} />
      </View>

      {/* Note Modal */}
      <Modal visible={isNoteModalOpen} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Add a Note</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.noteInput}
            placeholder="Enter Note"
            onChangeText={setText}
            value={text}
            multiline
          />
          <View style={styles.colorPickerContainer}>
            <Text>Select Color:</Text>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#ff0000" }]}
              onPress={() => setSelectedColor("#ff0000")}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#00ff00" }]}
              onPress={() => setSelectedColor("#00ff00")}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "#0000ff" }]}
              onPress={() => setSelectedColor("#0000ff")}
            />
          </View>
          <View style={styles.actionButtonContainer}>
            <Button onPress={onSaveNote} title="Save" />
            <Button color="red" onPress={() => setNoteModalOpen(false)} title="Cancel" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#eee",
    color: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
    flex: 1,
  },
  notesContainer: {
    padding: 10,
  },
  note: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: "gray",
  },
  addNoteContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    minHeight: 100,
    marginVertical: 10,
  },
  colorPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Note;