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

  imgAccount: {
    width: 350,
    height: 393,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 80,
  },

  titleMain: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5F5B5B', 
    marginVertical: 20,
    marginTop: 20,
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
    width:198,
  },

  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  
  imgBlur : {
    width: 287,
    height: 31,

  },
});

export default styles; 