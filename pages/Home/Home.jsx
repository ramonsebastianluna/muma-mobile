import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../auth/authSlice';
import { useDispatch } from 'react-redux';



const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home