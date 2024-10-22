
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";


import registered from "../../assets/registered-mail/registered-mail.png"
import blur from "../../assets/registered-mail/blur.png"
import styles from './registerRefused';

const RegisterRefused = () => { 
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
            source={registered}
            resizeMode="contain"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imgBlur}
            source={blur}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleMain}>Este e-mail ya se 
        encuentra registrado.</Text>
        <Text style={styles.paragraphMain}>
            Si no recordás tu contraseña podés 
            cambiarla desde el login ingresando en
            el enlace “Olvidé mi contraseña”.
        </Text>
        <TouchableOpacity style={styles.btnLogin} onPress={handleNavigate}>
          <Text style={styles.btnText}>Ir al login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


export default RegisterRefused; 