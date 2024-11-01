import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import success from "../../assets/success.png";
import styles from './successStyles';

const RegistroSuccess = () => {
 
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imgAccount}
            source={success}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleMain}>¡Qué bueno que estés acá!</Text>
        <Text style={styles.paragraphMain}>
          ¡Listo! Ya puedes empezar a usar tu cuenta.
        </Text>
        <TouchableOpacity style={styles.btnLogin} onPress={handleNavigate}>
          <Text style={styles.btnText}>Ir al login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegistroSuccess;