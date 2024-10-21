import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import iconMascotero from "../../assets/mascotero.png";
import iconProtectora from "../../assets/protectora.png";
import iconPuntosAbajo from "../../assets/iconPuntos-abajo.png";
import iconPuntosArriba from "../../assets/iconPuntosArriba.png";

import styles from "./SelectUserStyles"


const SelectUser = () => {
  const navigation = useNavigation();

  const handleSubmitProtector = () => {
    navigation.navigate("RegisterProtector");
  };

  const handleSubmitOwner = () => {
    navigation.navigate("PetterRegister");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRol}>
        
        <View style={styles.containerArriba}>
          <Image source={iconPuntosArriba} style={styles.puntosArriba} />
          <TouchableOpacity style={styles.btnMascotero} onPress={handleSubmitOwner}>
            <Image source={iconMascotero} style={styles.imgArriba} />
          </TouchableOpacity>
          <Text style={styles.title}>Mascotero</Text>
        </View>

       
        <View style={styles.containerAbajo}>
          <TouchableOpacity style={styles.btnProtectora} onPress={handleSubmitProtector}>
            <Image source={iconProtectora} style={styles.imgAbajo} />
          </TouchableOpacity>
          <Text style={styles.title}>Protectora</Text>
          <Image source={iconPuntosAbajo} style={styles.puntosAbajo} />
        </View>
      </View>
    </View>
  );
};

export default SelectUser;