import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import macho from '../../assets/card-pet/macho.png';
import hembra from '../../assets/card-pet/hembra.png';
import pinMap from '../../assets/card-pet/pin-map.png';
import styles from './pettCardStyles';

const PetCard = ({id, img, name, city, sex }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('DetailPett', {id}); 
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: img }} style={styles.image} />
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