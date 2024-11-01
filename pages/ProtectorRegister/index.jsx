import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
//import * as Yup from 'yup';
import validationSchema from "./validationSchema";
import axios from 'axios';
import useRegisterProtector from '../../hooks/useRegisterProtector';
import { Picker } from '@react-native-picker/picker';
import styles from './protectorRegisterStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/login.png';
import eye from '../../assets/eye.png';
import hidden from '../../assets/Vector.png';

const ProtectorRegister = () => {
  const { registerProtector } = useRegisterProtector();
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

  const handleSubmit = (values) => {
    const dataProtector = {
      nameProtector: values.nameProtector,
      description: values.description,
      email: values.email,
      password: values.password,
      city: values.city,
      street: values.street,
      number: values.number,
      floor: values.floor,
      apartment: values.apartment,
      webSite: values.webSite,
      instagram: values.instagram,
      facebook: values.facebook,
    }

    registerProtector(dataProtector);
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
          <Image source={logo} style={styles.logo} />
          <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
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
                setFieldValue,
                isSubmitting,
              }) => (
              <View style={styles.containerInput}>
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
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
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
                    <TouchableOpacity onPress={toggleConfPasswordVisibility} style={styles.iconContainer}>
                      <Image source={confPasswordVisible ? eye : hidden} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}

                  <View style={styles.input}>
                    <Picker
                      selectedValue={values.city}
                      onValueChange={(itemValue) => setFieldValue('city', itemValue)}
                    > 
                      <Picker.Item style={{fontSize: 14}} label={'Ciudad*'} value="" />
                      {cities.map((city) => (
                        <Picker.Item key={city.id} style={{fontSize: 14}} label={city.nombre} value={city.id} />
                      ))}
                    </Picker>
                  </View>
                  {touched.tamano && errors.tamano && 
                  <Text style={styles.error}>{errors.tamano}</Text>}
                
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
    </SafeAreaView>
   );
};

export default ProtectorRegister;

