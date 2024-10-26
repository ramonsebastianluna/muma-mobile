import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView,  Platform, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import useRegisterProtector from '../../hooks/useRegisterProtector';
import styles from './protectorRegisterStyles';

import logo from '../../assets/login.png';
import eye from '../../assets/eye.png';
import hidden from '../../assets/Vector.png';

const validationSchema = Yup.object().shape({
  nameProtector: Yup.string().required('El campo Nombre Protectora es requerido'),
  description: Yup.string().required('El campo Descripción es requerido'),
  email: Yup.string().email('Email no válido').required('El campo Email es requerido'),
  password: Yup.string().required('El campo Contraseña es requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Confirmación de contraseña es requerida'),
  city: Yup.string().required('El campo Ciudad es requerido'),
  street: Yup.string(),
  number: Yup.string(),
  floor: Yup.string(),
  apartment: Yup.string(),
  webSite: Yup.string(),
  instagram: Yup.string(),
  facebook: Yup.string(),
});

const ProtectorRegister = () => {
  const form = useRef();
//   const { registerProtector } = useRegisterProtector();
  const [cities, setCities] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfPasswordVisibility = () => setConfPasswordVisible(!confPasswordVisible);

  const getCities = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:8081/api/Combos/Ciudades/1');
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const submitForm = (values) => {
    const dataProtector = { ...values };
    // registerProtector(dataProtector, form.current); 
    // Comentado hasta que el hook esté implementado
  };

  const initialState = {
    nameProtector: '',
    description: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    street: '',
    number: '',
    floor: '',
    apartment: '',
    webSite: '',
    instagram: '',
    facebook: '',
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
     
        <Image source={logo} style={styles.logo} />
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              submitForm(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
            <View ref={form} style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre Protectora*"
                  value={values.nameProtector}
                  onChangeText={handleChange('nameProtector')}
                  onBlur={handleBlur('nameProtector')}
                />
                {errors.nameProtector && touched.nameProtector && (
                  <Text style={styles.error}>{errors.nameProtector}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Descripción*"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                {errors.description && touched.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email*"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña*"
                    secureTextEntry={!passwordVisible}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image source={passwordVisible ? eye : hidden} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar Contraseña*"
                    secureTextEntry={!confPasswordVisible}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <TouchableOpacity onPress={toggleConfPasswordVisibility}>
                    <Image source={confPasswordVisible ? eye : hidden} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Ciudad*"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                />
                {errors.city && touched.city && (
                  <Text style={styles.error}>{errors.city}</Text>
                )}

              
                <TextInput
                  style={styles.input}
                  placeholder="Calle"
                  value={values.street}
                  onChangeText={handleChange('street')}
                  onBlur={handleBlur('street')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Número"
                  value={values.number}
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Piso"
                  value={values.floor}
                  onChangeText={handleChange('floor')}
                  onBlur={handleBlur('floor')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Departamento"
                  value={values.apartment}
                  onChangeText={handleChange('apartment')}
                  onBlur={handleBlur('apartment')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Sitio Web"
                  value={values.webSite}
                  onChangeText={handleChange('webSite')}
                  onBlur={handleBlur('webSite')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Instagram"
                  value={values.instagram}
                  onChangeText={handleChange('instagram')}
                  onBlur={handleBlur('instagram')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Facebook"
                  value={values.facebook}
                  onChangeText={handleChange('facebook')}
                  onBlur={handleBlur('facebook')}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        
    </ScrollView>
 
   );
};

export default ProtectorRegister;

