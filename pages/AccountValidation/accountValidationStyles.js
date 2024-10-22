import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    marginBottom: 40,
  },
  imgAccount: {
    width: 250,
    height: 393,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleMain: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5F5B5B', 
    marginVertical: 20,
  },
  paragraphMain: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: '##5F5B5B',
    marginBottom: 10,
  },
  btnLogin: {
    backgroundColor: '#F08318', 
    paddingVertical: 13.5,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles; 