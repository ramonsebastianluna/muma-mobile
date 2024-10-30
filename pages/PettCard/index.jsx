import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import macho from '../../assets/card-pet/macho.png';
import hembra from '../../assets/card-pet/hembra.png';
import pinMap from '../../assets/card-pet/pin-map.png';

import styles from './pettCardStyles';



const PetCard = ({ img, name, city, sex }) => {
  return (
   <View style={styles.container}>
     <View style={styles.card}>
      <Image source={img} style={styles.image} />
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
  );
};

export default PetCard;