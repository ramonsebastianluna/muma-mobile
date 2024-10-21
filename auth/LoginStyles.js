import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  container: {
    width: "80%",
    alignItems: "center",
  },

  logo: {
    width: 106.67,
    height: 99,
    marginTop: 120,
    marginBottom: 50,
  },

  inputGroup: {
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#F6F6F6",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    width: "100%",
    marginBottom: 20,
  },

  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionsText: {
    marginLeft: 10,
    color: "#0199A3",
    marginBottom: "80"
  },

  forgotPassword: {
   color: "#0199A3",
    
  },

  loginButton: {
    backgroundColor: "#F08318",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 80, 
  },

  createButton: {
    backgroundColor: "#F6F6F6",
    padding: 15,
    borderColor: "#F08318",
    borderRadius: 5,
    alignItems: "center", 
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  createButtonText: {
    color: "#F08318",
    fontSize: 16,
  },
});

export default styles;
