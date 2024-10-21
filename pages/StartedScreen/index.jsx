import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';


const StartedScreen = ({ navigation }) => {
  return (
    <View style={{marginTop: Constants.statusBarHeight}}>
      <TouchableOpacity
        style={styles.createButtonText}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartedScreen

const styles = StyleSheet.create({
  createButtonText: {
    backgroundColor: "#F6F6F6",
    padding: 15,
    borderColor: "#F08318",
    borderRadius: 5,
    alignItems: "center", 
  },
})