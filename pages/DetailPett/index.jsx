import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { getPets, clearSelectedPet } from "../../pages/Home/petSlice";
import imgGatito from "../../assets/gatito.jpeg";
import mapIcon from "../../assets/map-pin.png";
import styles from "./detailPettStyles";
import imgProtector from "../../assets/animalistaLogo.png";
import imgPhone from "../../assets/phone.png";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const DetailPett = () => {
  const { selectedPet } = useSelector((state) => state.pets);
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets(id));

    return () => {
      dispatch(getPets());
    };
  }, [dispatch, id]);
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedPet?.fotos[0]}} style={styles.petImage} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.petName}>{selectedPet?.nombre}</Text>
          <TouchableOpacity style={styles.statusBadge}>
            <Text style={styles.statusText}>En adopción</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.locationText}>
          <Image source={mapIcon} /> {selectedPet?.ciudad} (2.5 km)
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoItem}>
            {selectedPet?.sexo + "\n"}
            <Text style={styles.infoSegItem}> Sexo</Text>
          </Text>
          <Text style={styles.infoItem}>
            Naranja{"\n"}
            <Text style={styles.infoSegItem}> Color</Text>
          </Text>
          <Text style={styles.infoItem}>
            {selectedPet?.raza + "\n"}
            <Text style={styles.infoSegItem}> Raza</Text>
          </Text>
          <Text style={styles.infoItem}>
            {selectedPet?.edad + " años\n"}
            <Text style={styles.infoSegItem}> Edad</Text>
          </Text>
        </View>

        <View style={styles.shelterInfo}>
          <View style={styles.protectorInfo}>
            <Image source={imgProtector} style={styles.userImage} />

            <Text>
              Protectora{"\n"}
              <Text style={styles.infoSegItem}>{selectedPet?.protectora.nombre}</Text>
            </Text>
          </View>

          <Image source={imgPhone} style={styles.userImage} />
        </View>

        <Text style={styles.description}>
          {selectedPet?.descripcion}
        </Text>

        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.buttonText}>Solicitar adopción</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPett;
