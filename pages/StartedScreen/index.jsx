import Constants from 'expo-constants';
import { useState } from 'react';
import { View, ScrollView, Dimensions, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dotActive from '../../assets/started-screen/dots/dot01.png';
import dotNoActive from '../../assets/started-screen/dots/dot02.png';
import image01 from '../../assets/started-screen/image01.png';
import image02 from '../../assets/started-screen/image02.png';

const { width } = Dimensions.get('window');

const data = [
  { 
    id: 1,
    uri: image01,
    title: "Sé parte del equipo",
    text: "Ayúdalos a volver a casa difundiendo información y colaborando con las protectoras para encontrarles un hogar.",
  },
  { 
    id: 2,
    uri: image02,
    title: "Encuentra a tu mejor amigo",
    text: "Si estás pensando en sumar un integrante más a tu familia, ¿por qué no adoptando?",
  },
];

const StartedScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  const handleSkip = () => {
    if (activeIndex === data.length - 1) {
      navigation.navigate('Login');
    } else {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {data.map((item) => (
            <View key={item.id} style={styles.item}>
              <Image source={item.uri} style={styles.image} resizeMode="contain" />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Paginación de puntos */}
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <Image
              key={index}
              source={index === activeIndex ? dotActive : dotNoActive}
              style={styles.paginationDot}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnSm} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSm} onPress={handleSkip}>
          <Text style={styles.btnText}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    marginTop: 80,
  },
  slider: {
    width: width, // Ocupa todo el ancho de la pantalla
    height: '75%',
  },
  scrollView: {
    width: '100%',
  },
  item: {
    width: width, // Ancho igual al de la pantalla para que ocupe un slide completo
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttons: {
    width: '80%',
    height: '25%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%', // Ajusta el alto de la imagen
  },
  btnSm: {
    paddingVertical: 13.5,
    width: 198,
    borderRadius: 8,
    backgroundColor: '#F08318',
    marginVertical: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
