import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import success from "../../assets/uploadsuccessful.png";
import styles from './editsuccessful';

const Editsuccessful = () => {
 
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
        <Text style={styles.titleMain}>Cambios 
        guardados con éxito!</Text>
        <TouchableOpacity style={styles.btnLogin} onPress={handleNavigate}>
          <Text style={styles.btnText}>Ir al Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Editsuccessful;