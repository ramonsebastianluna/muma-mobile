import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import logo from "../../assets/login.png";
import eye from "../../assets/eye.png";
import hidden from "../../assets/Vector.png";
import styles from './petterRegisterStyles';


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El campo Nombre es requerido"),
  lastName: Yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El apellido solo debe contener letras")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .required("El campo Apellido es requerido"),
  email: Yup.string()
    .email("Debe ingresar un email")
    .required("El campo Email es requerido"),
  password: Yup.string()
    .matches(/^\d+$/, "El password debe ser numérico")
    .required("El campo Password es requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña es requerida"),
});

const PetterRegister = () => {
  const form = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfPasswordVisibility = () => setConfPasswordVisible(!confPasswordVisible);

  const sendEmail = async () => {
    try {
      await emailjs.sendForm(
        process.env.VITE_EMAILJS_SERVICE_ID,
        process.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      return "SUCCESS";
    } catch (error) {
      console.log(error);
      return error.text;
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8081/api/Mascoteros/registro", {
        nombre: values.name,
        apellido: values.lastName,
        email: values.email,
        password: values.password,
      });

      const emailStatus = await sendEmail();
      if (emailStatus === "SUCCESS") {
        Alert.alert("Registro exitoso", "Verifica tu correo para activar la cuenta");
      } else {
        Alert.alert("Error", "No se pudo enviar el email");
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert("Error", "Hubo un problema con el registro");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container_input}>
            <Formik
              initialValues={{ name: "", lastName: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre*"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && 
                  <Text style={styles.error}>{errors.name}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Apellido*"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Email*"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && 
                  <Text style={styles.error}>{errors.email}</Text>}

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña*"
                      secureTextEntry={!passwordVisible}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Image source={passwordVisible ? eye : hidden} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password &&
                  <Text style={styles.error}>{errors.password}</Text>}

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirmar Contraseña*"
                      secureTextEntry={!confPasswordVisible}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    <TouchableOpacity onPress={toggleConfPasswordVisibility}>
                      <Image source={confPasswordVisible ? eye : hidden} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
      </View>
     
    </View>

  );
};

export default PetterRegister;
