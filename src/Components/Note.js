import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const Note = ({ onBack }) => {
  const [notes, setNotes] = useState([]);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#f9f9f9");
  const [isViewingNote, setIsViewingNote] = useState(false); // New state for viewing

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      setFilteredNotes(newNotes);
    } catch (error) {
      Alert.alert("Error", "Failed to save notes.");
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        setFilteredNotes(parsedNotes);
      } else {
        setNotes([]);
        setFilteredNotes([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load notes.");
    }
  };

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
    setIsViewingNote(false);
  }, [title, text, notes, selectedColor]);

  const onNotePress = (index) => {
    setSelectedIndex(index);
    setTitle(notes[index].title);
    setText(notes[index].content);
    setSelectedColor(notes[index].color || "#f9f9f9");
    setIsViewingNote(true);
    setNoteModalOpen(true);
  };

  const onEditNote = () => {
    setIsViewingNote(prevState => !prevState); // Switch to edit mode
  };

  const onDeleteNote = (index) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedNotes = notes.filter((_, i) => i !== index);
          saveNotes(updatedNotes);
        },
      },
    ]);
  };

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
      setFilteredNotes(notes);
    }
  }, [searchText, notes]);

  return (
    <SafeAreaView style={{ backgroundColor: "rebeccapurple", flex: 1 }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icons name="keyboard-backspace" size={24} color="skyblue" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Notes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Note"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            placeholderTextColor={"skyblue"}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icons name="magnify" size={24} color="skyblue" />
          </TouchableOpacity>
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
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => { 
            setTitle(""); 
            setText(""); 
            setIsViewingNote(false); 
            setNoteModalOpen(true); 
          }}
        >
          <Icons name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Modal visible={isNoteModalOpen} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {isViewingNote ? (
            <>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}>
             <TouchableOpacity onPress={() => setNoteModalOpen(false)} style={styles.editButton}>
                <Icons name="arrow-left" size={25} color="red" />
             </TouchableOpacity>
             <TouchableOpacity onPress={onEditNote} style={styles.editButton}>
                <Icons name="pencil" size={20} color="green" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>             
            </View>
            
              <Text style={styles.modalHeading}>{title}</Text>
              <Text style={styles.viewText}>{text}</Text>

            </>
          ) : (
            <>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}>

              <TouchableOpacity style={styles.editButton} onPress={() =>
              Alert.alert("Discard Note", "Are you sure you want to discard this note?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Discard",
                  onPress: () => {
                    setNoteModalOpen(false);
                  },
                },])}>

                <Icons name="arrow-left" size={25} color="red" />
                <Text style={{marginHorizontal: 5, color: "red"}}>Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onSaveNote} style={styles.editButton}>
                <Icons name="content-save-check" size={25} color="blue" />
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>

             </View>
               <TextInput style={styles.titleInput} placeholder="Enter Title" value={title} onChangeText={setTitle} />
              <TextInput style={styles.noteInput} placeholder="Enter Note" onChangeText={setText} value={text} multiline />
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "rebeccapurple", padding: 10, borderRadius: 20, height: 50 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "skyblue", flex: 1, textAlign: "center" },
  searchContainer: { flexDirection: "row", alignItems: "center" },
  searchInput: { backgroundColor: "rebeccapurple", borderRadius: 10, height: 35, color: "white", paddingHorizontal: 10, marginTop: 5 },
  notesContainer: { padding: 10 },
  note: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
  modalContainer: { padding: 20, backgroundColor: "white", borderRadius: 10, height: "100%" },
  modalHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "black" },
  viewText: { fontSize: 16, marginBottom: 20, color: "black" },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent", // Transparent background
    marginBottom: 10, // Space between buttons
  },
  editButtonText: {
    color: "green",
    marginLeft: 5,
    fontWeight: "bold",
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "transparent", // Transparent background
  },
  cancelButtonText: {
    color: "red",
    marginLeft: 5,
    fontWeight: "bold",
  },
  titleInput: {
    fontSize: 20, // Larger font size
    fontWeight: "bold", // Bold text
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  noteInput: {
    fontSize: 16, // Slightly smaller font size
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    flexWrap: "wrap",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20, // Floating from bottom
    right: 20, // Floating from right
    backgroundColor: "purple", // Button color
    width: 60, // Circular button size
    height: 60, // Circular button size
    borderRadius: 50, // Makes it round
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
});

export default Note;
