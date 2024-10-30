import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    padding: 0,
    marginLeft: 10,
    marginRight: 10,
  },  
  card: {
    width: 180,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 16,
  },
  image: {
    width: 159,
    height: 129.23,
    overflow: 'hidden',
    gap: 0,
    //borderRadius: '5 5 18 5',
    
  },
  body: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5F5B5B',
  },
  sexIcon: {
    width: 20,
    height: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    width: 18,
    height: 18,
  },
  city: {
    marginLeft: 8,
    fontSize: 14,
    color: '#5F5B5B',
  },
});

export default styles;