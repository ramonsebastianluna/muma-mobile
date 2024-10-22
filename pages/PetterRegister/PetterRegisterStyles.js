import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native'; 

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {

    width: "100%",
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
    marginBottom: 15,
   
  },
  passwordContainer: {
    position: 'relative', 
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -50 }],
    width: 24,
    height: 24,
    cursor: 'pointer',
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
});

export default styles;

