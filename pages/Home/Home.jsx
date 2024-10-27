import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { logout } from '../../auth/authSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text>Home</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, width: 200, marginTop: 20, marginBottom: 20  }}
          onPress={() => navigation.navigate('PettAdd')}>
          <Text>Crear mascota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, width: 200, marginTop: 20, marginBottom: 20  }} onPress={handleLogout}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home