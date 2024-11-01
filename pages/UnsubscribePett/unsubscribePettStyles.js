import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    dialogBox: {
      width: 300,
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#5F5B5B",
    },
    message: {
      fontSize: 16,
      textAlign: "center",
      color: "#5F5B5B",
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    cancelButton: {
      flex: 1,
      marginRight: 10,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: "#E11900",
      borderRadius: 5,
      alignItems: "center",
    },
    cancelText: {
      color: "#E11900",
      fontWeight: "bold",
    },
    confirmButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: "#E11900",
      borderRadius: 5,
      alignItems: "center",
    },
    confirmText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  });
  
  export default styles;