import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import account from "../../assets/account-validation.png";
import styles from './accountValidationStyles';

const AccountValidation = () => {
 
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
            source={account}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleMain}>¡Te enviamos un correo!</Text>
        <Text style={styles.paragraphMain}>
          Revisa tu correo. Te llegará un mensaje de validación y deberás confirmar tu cuenta para finalizar con el registro.
        </Text>
        <Text style={styles.paragraphMain}>
          *Recuerda revisar en tu casilla de Spam o de Correo no deseado, a veces llega ahí.
        </Text>
        <TouchableOpacity style={styles.btnLogin} onPress={handleNavigate}>
          <Text style={styles.btnText}>Abrir correo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountValidation;
