
import { StyleSheet,   Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0",
    },
    safeArea: {
      position: "relative",
      height: "%100",
    },
    addBtn: {
      position: "absolute",
      bottom: 30,
      right: 10,
    },
    navbar: {
      display: "flex",
      marginTop: 5,
      paddingLeft: 20,
      paddingRight: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navbar__profileImg: {
      width: 65,
      height: 65,
    },
    navbar__btnOffCanvas: {
      width: 40,
      height: 40,
    },
    button: {
      padding: 10,
      backgroundColor: "#007bff",
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
    offcanvas: {
      position: "absolute",
      top: 0,
      left: 0,
      width: width * 0.8,
      height: "100%",
      backgroundColor: "white",
      padding: 20,
      justifyContent: "center",
    },
    offcanvasText: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#ff4757",
      borderRadius: 5,
    },
    closeText: {
      color: "#fff",
      fontSize: 16,
    },
    searchContainer: {
      
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 8,
      backgroundColor: "#D8D8D8",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#e0e0e0",
      marginTop:20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: "#333",
    },
  });

  export default styles; 