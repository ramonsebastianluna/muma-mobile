//import { StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { View, ScrollView, Dimensions, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import dotActive from '../../assets/started-screen/dots/dot01.png';
import dotNoActive from '../../assets/started-screen/dots/dot02.png';
import image01 from '../../assets/started-screen/image01.png';
import image02 from '../../assets/started-screen/image02.png';

const { width } = Dimensions.get('window');

const images = [
  { id: 1, uri: image01 },
  { id: 2, uri: image02 },
];

const StartedScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.slider}>
    //     <ScrollView
    //       horizontal
    //       pagingEnabled
    //       showsHorizontalScrollIndicator={false}
    //       onScroll={handleScroll}
    //       scrollEventThrottle={16}
    //     >
    //       {images.map((image) => (
    //         <View key={image.id}>
    //           <View style={styles.imageContainer}>
    //             <Image source={ image.uri } style={styles.image} />
    //           </View>
    //           <Text>hola</Text>
    //           <Text>hola</Text>
    //         </View>
    //       ))}
    //     </ScrollView>
    //     <View style={styles.pagination}>
    //       {images.map((_, index) => (
    //         <View
    //           key={index}
    //           style={[
    //             styles.paginationDot,
    //             index === activeIndex ? styles.activeDot : null,
    //           ]}
    //         />
    //       ))}
    //     </View>
    //   </View>
    //   <View>
    //     <TouchableOpacity style={styles.btnSm} onPress={() => navigation.navigate('Login')}>
    //       <Text style={styles.btnText}>Iniciar Sesion</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.btnSm} onPress={() => navigation.navigate('Login')}>
    //       <Text style={styles.btnText}>Omitir</Text>
    //     </TouchableOpacity>
    //   </View>

    // </View>
    <View style={styles.container}>
      <View style={styles.slider}>
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((image) => (
              <Image key={image.id} source={ image.uri } style={styles.image} />
            ))}
        </ScrollView>
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
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E9EC',
  },
  slider: {
    width: '80%',
    height: '75%',
    backgroundColor: '#d7a9a9',
  },
  buttons: {
    width: '80%',
    height: '25%',
    backgroundColor: '#842828',
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


// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnSm : {
//     fontSize: 14,
//     paddingTop: 13.5,
//     paddingBottom: 13.5,
//     width: 198,
//     borderRadius: 8,
//     backgroundColor: '#F08318',
//     border: 'none',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   btnText : {
//     textAlign: 'center',
//     color: '#FFFFFF',
//   },
//   slider: {
//     marginTop: Constants.statusBarHeight,
//     alignItems: 'center',
//     width: '80%',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 500,
//     width: 400,
//     backgroundColor: '#000',
//   },
//   image: {
//     // width : 400,
//     // height: 400,
//     resizeMode: 'cover',
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//   },
//   paginationDot: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#ccc',
//     margin: 5,
//   },
//   activeDot: {
//     backgroundColor: '#000',
//   },
// });