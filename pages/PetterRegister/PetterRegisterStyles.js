import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'; 

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    justifyContent:"center", 
    alignItems: 'center',
    marginTop:80,
  },
  container_input: {
    width:"80%"
  },
  logo: {
    width: 106.67,
    height: 99,
    marginTop: 120,
    marginBottom: 50,
  },
  button: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
    backgroundColor:  "#F08318",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText:{
    color:"#F6F6F6",
  },
  input: {
    backgroundColor: '#F6F6F6', 
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8, 
  },
  passwordContainer: {
    position: 'relative', 
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    width: 27,
    height: 20,
    top: '130%',
    transform: [{ translateY: -50 }],
  },
  icon: {
    width: 27,
    height: 20,
  },
  forgotPassword: {
    color: 'var.$secondary-01', 
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 'auto',
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 15,
  },
});

export default styles;

