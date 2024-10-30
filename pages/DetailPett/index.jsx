import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import imgGatito from "../../assets/gatito.jpeg";
import mapIcon from "../../assets/map-pin.png";
import styles from "./detailPettStyles";
import imgProtector from "../../assets/animalistaLogo.png";
import imgPhone from "../../assets/phone.png";

const DetailPett = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imgGatito} style={styles.petImage} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.petName}>Garfield</Text>
          <TouchableOpacity style={styles.statusBadge}>
            <Text style={styles.statusText}>En adopción</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.locationText}>
          <Image source={mapIcon} /> Rosario (2.5 km)
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoItem}>
            Macho{"\n"}
            <Text style={styles.infoSegItem}> Sexo</Text>
          </Text>
          <Text style={styles.infoItem}>
            Naranja{"\n"}
            <Text style={styles.infoSegItem}> Color</Text>
          </Text>
          <Text style={styles.infoItem}>
            Persa{"\n"}
            <Text style={styles.infoSegItem}> Raza</Text>
          </Text>
          <Text style={styles.infoItem}>
            2 años{"\n"}
            <Text style={styles.infoSegItem}> Edad</Text>
          </Text>
        </View>

        <View style={styles.shelterInfo}>
          <View style={styles.protectorInfo}>
            <Image source={imgProtector} style={styles.userImage} />

            <Text>
              {" "}
              Protectora{"\n"}
              <Text style={styles.infoSegItem}> Animalistas</Text>
            </Text>
          </View>

          <Image source={imgPhone} style={styles.userImage} />
        </View>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
          velit.
        </Text>

        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.buttonText}>Solicitar adopción</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPett;
