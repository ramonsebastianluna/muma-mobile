import { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { logout } from '../../auth/authSlice';
import { getPets, getProtector } from "./petSlice";
import { useDispatch, useSelector } from 'react-redux';
import toggleButton from '../../assets/home/bar-chart.png';
import profile from '../../assets/home/profile.png';
import add from '../../assets/home/add.png';
import PetCard from '../PettCard';
import ProtectorCard from '../ProtectorCard';

const { width } = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, role } = useSelector((state) => state.login);
  const { petsAvailable, protectorsAvailable } = useSelector((state) => state.pets);
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  useEffect(() => {
    dispatch(getPets());
    dispatch(getProtector());
  }, [dispatch]);

  const toggleOffcanvas = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(!isVisible));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={toggleOffcanvas}>
              <Image style={styles.navbar__btnOffCanvas} source={toggleButton} />
            </TouchableOpacity>
            <Image style={styles.navbar__profileImg} source={profile} />
          </View>
        </View>

        <View>
          <Text style={{height: 100}}>Acá va el buscador</Text>
        </View>

        <View>
          <Text style={{height: 100}}>Acá va slider</Text>
        </View>
        
        <View>
          { petsAvailable.length < 1 ? 
            <Text style={{textAlign: 'center'}}>No hay mascotas disponibles</Text>
            : 
            <ScrollView horizontal>
              {(petsAvailable.map((pet) => (
                <PetCard key={pet.id} img={pet.fotos[0]} name={pet.nombre} city={pet.ciudad} sex={pet.sexo} />))
              )}
            </ScrollView>
          }
        </View>

        <View>
          <ScrollView horizontal>
            {(protectorsAvailable.map((protector) => (
              <ProtectorCard
                key={protector.id}
                protectorName={protector.nombre}
                protectorDesc={protector.descripcion}
                protectorMail={protector.email}
                protectorInstagram={protector.instagram}  
              />))
            )}
          </ScrollView>
        </View>

        {role === 'Protectora' && (
          <TouchableOpacity onPress={() => navigation.navigate('PettAdd')} style={styles.addBtn}>
            <Image source={add} />
          </TouchableOpacity>
        )}
      </SafeAreaView>

      <Animated.View style={[styles.offcanvas, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.offcanvasText}>App creada por Hilda y Seba</Text>
        <TouchableOpacity onPress={toggleOffcanvas} style={styles.closeButton}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, width: 200, marginTop: 20, marginBottom: 20  }} onPress={handleLogout}>
           <Text>Cerrar sesión</Text>
         </TouchableOpacity>
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  safeArea : {
    position: 'relative',
    height: '%100',
  },
  addBtn : {
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  navbar : {
    display: 'flex',
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbar__profileImg : {
    width: 65,
    height: 65,
  },
  navbar__btnOffCanvas : {
    width: 40,
    height: 40,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  offcanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8, // Ancho del offcanvas
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  offcanvasText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff4757',
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default Home