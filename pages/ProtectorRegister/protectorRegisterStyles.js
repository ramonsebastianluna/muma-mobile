import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    margintop:100,
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
  iconContainer: {
    position: 'absolute',
    width: 30,
    width: 27,
    height: 25,
    top: '100%',
    right: 10,
    transform: [{ translateY: -50 }],
  },
  icon: {
    position: 'absolute',
    width: 27,
    height: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
  },
});

export default styles;
