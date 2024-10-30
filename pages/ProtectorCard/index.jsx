import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProtectorImg from '../../assets/profilePicture.png';
import IconClose from '../../assets/x-circle.png';
import styles from './protector-card';
import phone from '../../assets/phone.png'

const ProtectorCard = ({
  protectorName = 'Animalistas',
  protectorDesc = 'Se parte del cambio que querés ver en el mundo',
  protectorMail = 'animalistas@gmail.com',
  protectorInstagram = '@animalistasderosario',
}) => {
  return (
    <View style={styles.container}>  
          <View style={styles.card}>
            <TouchableOpacity onPress={() => { /* Aquí puedes manejar la navegación o acción */ }}>
              <Image source={IconClose} style={styles.closeButton} />
            </TouchableOpacity>

            <View style={styles.header}>
              <Image source={ProtectorImg} style={styles.profileImage} />
            </View>

            <View style={styles.body}>
              <Text style={styles.title}>{protectorName}</Text>
              <Text style={styles.description}>{protectorDesc}</Text>
            </View>

            <View style={styles.infoList}>
              
              <Text style={styles.infoItem}><Image style={styles.phone} source={phone}/> +54341567890</Text>
              <Text style={styles.infoItem}><Image style={styles.phone} source={phone}/> {protectorMail}</Text>
              <Text style={styles.infoItem}><Image style={styles.phone} source={phone}/> {protectorInstagram}</Text>
            </View>
          </View>
  </View>
  );
};



export default ProtectorCard;
