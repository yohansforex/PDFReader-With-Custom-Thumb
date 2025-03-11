import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, StatusBar, Modal } from 'react-native';
import React, { useEffect } from 'react';
import Pdf from 'react-native-pdf';
import { Slider } from '@react-native-assets/slider';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Bottom from '../Others/Bottom';

const PdfScreen = ({ onBack }) => {
  const source = { uri: 'bundle-assets://ormoo.pdf' };
  const [currentPage, setCurrentPage] = React.useState(1);
  const pdfRef = React.useRef();
  const [inputPage, setInputPage] = React.useState('');
  const [isStatusBarHidden, setStatusBarHidden] = React.useState(false);
  const [isHeaderFooterVisible, setHeaderFooterVisible] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isHLScroll, setIsHLScroll] = React.useState(false);
  // Function to reset the inactivity timer

  const handlePageSearch = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= 544) {
      pdfRef.current?.setPage(pageNumber);
      setCurrentPage(pageNumber);
      setInputPage(''); // Clear input after search
    } else {
      Alert.alert('Invalid Page', 'Please enter a page number between 1 and 544.');
    }
  };

  const onSlidingComplete = (value) => {
    pdfRef.current?.setPage(value);
    setCurrentPage(value);
  };

  const CustomThumb = ({ value }) => {
    return (
      <View style={styles.thumbContainer}>
        <View style={styles.thumbTextContainer}>
          <Text style={styles.thumbText}>{value}</Text>
        </View>
      </View>
    );
  };
  

  const handleSingleTap = () => {
    setStatusBarHidden((prev) => !prev);
    setHeaderFooterVisible((prev) => !prev);
  };
  const handleChapterPress = (pageNumber) => {
    pdfRef.current?.setPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleHorizontalScroll = () => {
    setIsHLScroll((prev) => !prev);
  };

  const handlePdfMenu = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={isStatusBarHidden} />

      {isHeaderFooterVisible && (
        <LinearGradient colors={["darkred", "black", "slategray"]} style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={() => onBack()}>
              <Icons name="keyboard-backspace" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Handhuurraa Oromo Arsi</Text>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search Page"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={inputPage}
                onChangeText={setInputPage}
                onSubmitEditing={handlePageSearch}
                style={[styles.searchInput, { fontSize: 10 }]}
              />
              <TouchableOpacity onPress={handlePageSearch} style={styles.searchButton}>
                <Icons name="magnify" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}

      {/* PDF Viewer & Vertical Slider */}
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          ref={pdfRef}
          onLoadComplete={(numberOfPages) => console.log(`Number of pages: ${numberOfPages}`)}
          onPageChanged={(page) => {
            setCurrentPage(page);
          }}
          onError={(error) => console.log(error)}
          style={styles.pdf}
          horizontal={isHLScroll}
          onPageSingleTap={handleSingleTap}
        />
          <View style={styles.verticalSliderContainer}>
            <Slider
              value={currentPage}
              minimumValue={1}
              maximumValue={544}
              step={1}
              minimumTrackTintColor="black"
              maximumTrackTintColor="darkred"
              vertical={true}
              onSlidingComplete={onSlidingComplete}
              CustomThumb={CustomThumb}
            />
          </View>
      </View>

      {isHeaderFooterVisible && (
        <LinearGradient colors={["darkred", "black", "slategray"]} style={styles.footerGradient}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>{`Page ${currentPage}/544`}</Text>
            <TouchableOpacity onPress={handlePdfMenu}>
              <Icons name="menu" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      {/* Modal for Bottom Menu */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <Bottom onChapterPress={handleChapterPress} onClose={() => setModalVisible(false)} onToggleScroll={handleHorizontalScroll}/>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icons name="close" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PdfScreen;


const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    height: "35%", // Adjust height dynamically
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    borderColor: 'white',
    height: 30,
    width: 70,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    color: 'white',
    textAlign: 'center',
  },
  searchButton: {
    padding: 5,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  verticalSliderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  thumbContainer: {
    height: 20,
    width: 40,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbTextContainer: {
    width: 30,
    height: 20,
  },
  thumbText: {
    fontSize: 15,
    color: 'darkred',
    fontWeight: 'bold',
  },
  footerGradient: {
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  footerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});