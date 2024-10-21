import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default styles;
