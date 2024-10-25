
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
      width: 280,
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      padding: 16,
      position: 'relative',
    },
    closeButton: {
      width: 24,
      height: 24,
      position: 'absolute',
      top: 10,
      right: 10,
    },
    phone:{
        width:20,
        height:20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    body: {
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 16,
    },
    infoList: {
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      paddingTop: 8,
    },
    infoItem: {
      fontSize: 14,
      color: '#333',
      marginVertical: 4,
    },
  });

  export default styles; 