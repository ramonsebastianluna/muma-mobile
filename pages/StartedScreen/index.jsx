import Constants from 'expo-constants';
import { useState } from 'react';
import { View, ScrollView, Dimensions, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import dotActive from '../../assets/started-screen/dots/dot01.png';
import dotNoActive from '../../assets/started-screen/dots/dot02.png';
import image01 from '../../assets/started-screen/image01.png';
import image02 from '../../assets/started-screen/image02.png';

const { width } = Dimensions.get('window');

const data = [
  { id: 1,
    uri: image01,
    title: "Se parte del equipo",
    text: "Ayudalos a volver a casa difundiendo informaciíon y colaborando con las protectoras para encontrarles un hogar.",
  },
  { id: 2,
    uri: image02,
    title: "Encontrá tu mejor amigo",
    text: "Si estas pensando en sumar un integrante más a tu familia ¿Por que no adoptando?",
  },
];

const StartedScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
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
                <Image source={ item.uri } style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>
                  {item.text}
                </Text>
              </View>
            ))}
        </ScrollView>
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnSm} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSm} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StartedScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  slider: {
    display: 'flex',
    width: '80%',
    height: '75%',
  },
  scrollView: {
    width: '100%',
  },
  item: {
    width: 350,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 0,
    marginRight: 0,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
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
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  buttons: {
    width: '80%',
    height: '25%',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 393,
  },
  btnSm : {
    fontSize: 14,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    width: 198,
    borderRadius: 8,
    backgroundColor: '#F08318',
    border: 'none',
    marginTop: 10,
    marginBottom: 10,
  },
  btnText : {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});