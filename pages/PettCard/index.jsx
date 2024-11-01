import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import macho from '../../assets/card-pet/macho.png';
import hembra from '../../assets/card-pet/hembra.png';
import pinMap from '../../assets/card-pet/pin-map.png';
import edit from '../../assets/Edición.png';
import favorito from '../../assets/Favorito.png';
import styles from './pettCardStyles';

const PetCard = ({id, img, name, city, sex, role }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('DetailPett', {id}); 
  };

  const handleEdit = () => {
    navigation.navigate('EditPett', {id}); 
  };

  return (
    
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
            {role === 'Protectora' ? (
              <TouchableOpacity onPress={handleEdit} style={styles.iconContainer}>
                <Image source={edit} style={styles.iconCard} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconContainer}>
                <Image source={favorito} style={styles.iconCard} />
              </View>
            )}
          </View>
          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{name}</Text>
              <Image source={sex === 'Macho' ? macho : hembra} style={styles.sexIcon} />
            </View>
            <View style={styles.locationRow}>
              <Image source={pinMap} style={styles.pinIcon} />
              <Text style={styles.city}>{city}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PetCard;