import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', 
   
  },



  logo: {
    width: 106.67,
    height: 99,
    marginTop: 120,
    marginBottom: 50,
  },

 containerInput: {
  width: "80%"
 },

  button: {
   
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#F08318",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  
  },

  buttonText: {
    color: "#F6F6F6",
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
   
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
  },
    label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#F08318',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
  width: 100,
  height: 100,
  marginRight: 10,
  borderRadius: 8,
}
});

export default styles;