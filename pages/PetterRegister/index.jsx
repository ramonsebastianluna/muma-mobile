import React, { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Constants from 'expo-constants';
import logo from "../../assets/login.png";
import eye from "../../assets/eye.png";
import hidden from "../../assets/Vector.png";
import styles from './PetterRegisterStyles';


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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfPasswordVisibility = () => setConfPasswordVisible(!confPasswordVisible);

  const sendEmail = async (name) => {
    try {
      const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: Constants.expoConfig.extra.SERVICE_ID,
        template_id: Constants.expoConfig.extra.TEMPLATE_ID,
        user_id: Constants.expoConfig.extra.PUBLIC_KEY,
        template_params: {
          name: name,
        },
      });
  
      return response.status === 200 ? "SUCCESS" : "ERROR";
  
    } catch (error) {
      console.error("Error en el envío del email:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : error.message;
    }
  }

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://192.168.0.106:8081/api/Mascoteros/registro", {
        nombre: values.name,
        apellido: values.lastName,
        email: values.email,
        password: values.password,
      });

      const emailStatus = await sendEmail(values.name);
      if (emailStatus === "SUCCESS") {
        navigation.navigate("AccountValidation");
      } else {
        console.error("Error al enviar el email:", emailStatus);
      }
    } catch (error) {
      console.log('el error es: ' + error)
      const response = JSON.parse(error.request.response);
      console.log('la respuesta es: ' + response)

      if (response.errors && response.errors.includes("Ya existe un usuario registrado con esa dirección de email")) {
        navigation.navigate("RegisterRefused");
      } else {
        console.error("Error:", response.errors);
      }
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
