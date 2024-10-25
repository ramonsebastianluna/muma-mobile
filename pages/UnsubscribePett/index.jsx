import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./unsubscribePettStyles.js";
const UnsubscribePett = ({ nombre, onCancel, onConfirm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dialogBox}>
        <Text style={styles.title}>Dar de baja</Text>
        <Text style={styles.message}>
          ¿Estás seguro de que querés dar de baja a {nombre}?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default UnsubscribePett;
