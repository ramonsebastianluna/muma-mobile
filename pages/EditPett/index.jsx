import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./edit-pett";
import validationSchema from "./validationShcema";
import { getPets } from "../../pages/Home/petSlice";
import apiAuthenticated from "../../api/apiAuthenticated";
import axios from "axios";

const EditPett = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params;
  const { token } = useSelector((state) => state.login);
  const { selectedPet } = useSelector((state) => state.pets);
  const [imagenes, setImagenes] = useState(selectedPet?.fotos || []); // Inicializar con la imagen existente
  const [errorImagenes, setErrorImagenes] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getPets(id));
    }
    return () => {
      dispatch(getPets());
    };
  }, [dispatch, id]);
  
  const initialState = selectedPet || {
    nombre: "",
    tipoAnimal: "",
    raza: "",
    descripcion: "",
    sexo: "",
    tamano: "",
    temperamentoConAnimales: "",
    temperamentoConPersonas: "",
    edad: "",
    estado: "",
    ciudad: "",
    mesAnioNacimiento: "",
    fotos: [],
  };

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      if (result.assets.length + imagenes.length > 1) {
        setErrorImagenes("No puedes subir más de 10 imágenes.");
        return;
      }

      const nuevasImagenes = result.assets.map((asset) => asset.uri);
      setImagenes((prev) => [...prev, ...nuevasImagenes]);
      setFieldValue('fotos', (prev) => [...prev, ...nuevasImagenes]); 
      setErrorImagenes("");
    }
  };

  const uploadImagesToCloudinary = async (fotos) => {
    const formDataArray = fotos.map((imagen) => {
      const formData = new FormData();
      formData.append("file", {
        uri: imagen,
        type: 'image/png',
        name: 'upload.jpg',
      });
      formData.append("upload_preset", "mumapreset");
      return formData;
    });
  
    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post("https://api.cloudinary.com/v1_1/dkthfc4hc/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        )
      );
      return responses.map((response) => response.data.secure_url);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      throw error;
    }
  };
  
  const handleSubmit = async (values) => {
    const formatMesAnio = (fecha) => {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      return `${year}-${month}`;
    };

    try {
      const imageUrl = await uploadImagesToCloudinary(imagenes);

      const data = {
        ...values,
        fotos: imageUrl,
        mesAnioNacimiento: formatMesAnio(values.mesAnioNacimiento),
        protectoraId: 1, //sobreescribo el id porque no funciona con el id de la protectora logueada.
      };

      console.log('data: ', data);

      const requestAuthenticated = apiAuthenticated(token); 
      const response = await requestAuthenticated.put(`/Mascotas/${id}`, data);
      navigation.navigate('EditSuccessful');
    } catch (error) {
      console.error("Error al agregar animal:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Editar Mascota</Text>
        <Formik
          initialValues={initialState}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit: formikHandleSubmit,
            isSubmitting,
          }) => (
            <View style={styles.containerInput}>
              <View style={styles.inputGroup}>
                <TextInput 
                  style={[
                    styles.input,
                    touched.nombre && errors.nombre ? styles.inputError : null,
                  ]}
                  placeholder="Nombre del animal*"
                  value={values.nombre}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  
                />
                {errors.nombre && touched.nombre && (
                  <Text style={styles.error}>{errors.nombre}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Raza*"
                  value={values.raza}
                  onChangeText={handleChange('raza')}
                  onBlur={handleBlur('raza')}
                
                />
                {touched.raza && errors.raza && <Text style={styles.error}>{errors.raza}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.select,
                    touched.tipoAnimal && errors.tipoAnimal ? styles.inputError : null,
                  ]}>
                  <Picker 
                    selectedValue={values.tipoAnimal}
                    onValueChange={(tipoAnimal) => setFieldValue('tipoAnimal', tipoAnimal)}
                  >
                    <Picker.Item style={{fontSize: 14}} label="Tipo*" value="" />
                    <Picker.Item style={{fontSize: 14}} label="Perro" value="perro" />
                    <Picker.Item style={{fontSize: 14}} label="Gato" value="gato" />
                    <Picker.Item style={{fontSize: 14}} label="Otro" value="otro" />
                  </Picker>
                </View>
                {touched.tipoAnimal && errors.tipoAnimal && 
                <Text style={styles.error}>{errors.tipoAnimal}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <View 
                  style={[
                    styles.select,
                    touched.tamano && errors.tamano ? styles.inputError : null,
                  ]}>
                  <Picker
                    selectedValue={values.tamano}
                    onValueChange={(itemValue) => setFieldValue('tamano', itemValue)}
                  >
                    <Picker.Item style={{fontSize: 14}} label="Tamaño*" value="" />
                    <Picker.Item style={{fontSize: 14}} label="Pequeño" value="Pequeño" />
                    <Picker.Item style={{fontSize: 14}} label="Mediano" value="Mediano" />
                    <Picker.Item style={{fontSize: 14}} label="Grande" value="Grande" />
                  </Picker>
                </View>
                {touched.tamano && errors.tamano && 
                <Text style={styles.error}>{errors.tamano}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Carácter con animales*"
                  value={values.temperamentoConAnimales}
                  onChangeText={handleChange('temperamentoConAnimales')}
                  onBlur={handleBlur('temperamentoConAnimales')}
                />
                {touched.temperamentoConAnimales && errors.temperamentoConAnimales && 
                <Text style={styles.error}>{errors.temperamentoConAnimales}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Carácter con personas*"
                  value={values.temperamentoConPersonas}
                  onChangeText={handleChange('temperamentoConPersonas')}
                  onBlur={handleBlur('temperamentoConPersonas')}
                />
                {touched.temperamentoConPersonas && errors.temperamentoConPersonas && 
                <Text style={styles.error}>{errors.temperamentoConPersonas}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Edad*"
                  keyboardType="numeric"  
                  value={values.edad}
                  onChangeText={(text) => setFieldValue('edad', text ? parseInt(text.replace(/[^0-9]/g, ''), 10) : 0)}

                  onBlur={handleBlur('edad')}
                />
                {touched.edad && errors.edad && <Text style={styles.error}>{errors.edad}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Estado*"
                  value={values.estado}
                  onChangeText={handleChange('estado')}
                  onBlur={handleBlur('estado')}
                />
                {touched.estado && errors.estado &&
                <Text style={styles.error}>{errors.estado}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={[
                    styles.input,
                    touched.ciudad && errors.ciudad ? styles.inputError : null,
                  ]}
                  placeholder="Ubicación*"
                  value={values.ciudad}
                  onChangeText={handleChange('ciudad')}
                  onBlur={handleBlur('ciudad')}
                
                />
                {touched.ciudad && errors.ciudad && 
                <Text style={styles.error}>{errors.ciudad}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TouchableOpacity onPress={() => setShow(true)} style={[
                    styles.input,
                    touched.ciudad && errors.ciudad ? styles.inputError : null,
                  ]}>
                  <Text style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {values.mesAnioNacimiento === "" ? "Nacimiento*" : values.mesAnioNacimiento}
                  </Text>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(false); 
                      if (selectedDate) {
                        setFieldValue('mesAnioNacimiento', selectedDate.toISOString().split('T')[0]);
                      }
                    }}
                    minimumDate={new Date(2000, 0, 1)}
                    maximumDate={new Date()}
                  />
                )}
                {touched.mesAnioNacimiento && errors.mesAnioNacimiento && 
                <Text style={styles.error}>{errors.mesAnioNacimiento}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Descripcion"
                  value={values.descripcion}
                  onChangeText={handleChange('descripcion')}
                  onBlur={handleBlur('descripcion')}
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.radioContainer}>
                  <View style={styles.radioGroup}>
                    <TouchableOpacity onPress={() => setFieldValue('sexo', 'Macho')}>
                      <View style={styles.radioButton}>
                        <RadioButton
                          value="Macho"
                          status={values.sexo === 'Macho' ? 'checked' : 'unchecked'}
                          onPress={() => setFieldValue('sexo', 'Macho')}
                        />
                        <Text>Macho</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFieldValue('sexo', 'Hembra')}>
                      <View style={styles.radioButton}>
                        <RadioButton
                          value="Hembra"
                          status={values.sexo === 'Hembra' ? 'checked' : 'unchecked'}
                          onPress={() => setFieldValue('sexo', 'Hembra')}
                        />
                        <Text>Hembra</Text>
                      </View>

                    </TouchableOpacity>
                  </View>
                  {touched.sexo && errors.sexo && <Text style={styles.error}>{errors.sexo}</Text>}
                </View>
              </View>
              
              <View style={styles.inputGroup}> 
                <TouchableOpacity onPress={() => pickImage(setFieldValue)} style={styles.input}>
                  <Text style={{ paddingTop: 5, paddingBottom: 5 }}>Cargar imágenes (máximo 10)*</Text>
                </TouchableOpacity>

                <ScrollView horizontal>
                  {imagenes.map((uri, index) => (
                    <Image 
                      key={index} 
                      source={{ uri }} 
                      style={styles.image} 
                    />
                  ))}
                </ScrollView>

                {errorImagenes ? <Text style={styles.error}>{errorImagenes}</Text> : null}
              </View> 

              <TouchableOpacity 
                onPress={formikHandleSubmit}
                style={styles.button}
                disabled={isSubmitting}>
                <Text style={styles.buttonText}>
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Guardar cambios</Text>
                  )}
                </Text>
              </TouchableOpacity>
              
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPett;
