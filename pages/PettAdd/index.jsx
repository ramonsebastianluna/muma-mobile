
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper'; 
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import styles from "./pett-add"

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede tener más de 50 caracteres")
  .required("El campo Nombre es requerido"),
   tipoAnimal: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El tipo de animal solo debe contener letras")
  .min(4, "El tipo de animal debe tener al menos 2 caracteres")
  .max(50, "El tipo de animal no puede tener más de 50 caracteres")
  .required("El campo tipo de animal es requerido"),
  raza: Yup.string()
  .required('La raza es obligatoria')
  .max(30, 'La raza no puede superar los 30 caracteres'),
  descripcion: Yup.string()
    .max(300, 'La descripción no puede superar los 300 caracteres'),
  sexo: Yup.string().required("Debes seleccionar un sexo"),
  temperamentoConAnimales: Yup.string()
  .required('El temperamento con otros animales es obligatorio'),

  temperamentoConPersonas: Yup.string()
    .required('El temperamento con personas es obligatorio'),

  edad: Yup.number()
    .required('La edad es obligatoria')
    .min(0, 'La edad no puede ser negativa')
    .max(30, 'La edad no puede superar los 30 años'), 
  estado: Yup.string()
  .required('El estado es obligatorio'),
  tamano: Yup.string().required("El tamaño es requerido"),
  ciudad: Yup.string().required("Este campo es obligatorio"),
  mesAnioNacimiento: Yup.string()
  .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de fecha debe ser DD/MM/AAAA")
  .required("La fecha de nacimiento es requerida"),
  protectoraId: Yup.string().required("Este campo es obligatorio"),
});

const PettAdd = () => {
  const [imagenes, setImagenes] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [errorImagenes, setErrorImagenes] = useState("");
  const navigation = useNavigation();
 
  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      
    }
  );
  
console.log(result, "Este es mi result")
    if (!result.canceled) {
      if (result.assets.length + imagenes.length > 10) {
        setErrorImagenes("No puedes subir más de 10 imágenes.");
        return;
      }

      const nuevasImagenes = result.assets.map((asset) => asset.uri);
      setImagenes((prev) => [...prev, ...nuevasImagenes]);
      setFieldValue('fotos', (prev) => [...prev, ...nuevasImagenes]); 
      setErrorImagenes("");
    }
  };

    

  const uploadImagesToCloudinary = async () => {
    const formDataArray = imagenes.map((imagen) => {
      const formData = new FormData();
      formData.append("file", { uri: imagen, type: "image/jpeg", name: "animal.jpg" });
      formData.append("upload_preset", "djn5lvybe");
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post("https://api.cloudinary.com/v1_1/djn5lvybe/image/upload", formData)
        )
      );
      return responses.map((response) => response.data.secure_url);
     
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      throw error;
    }
  };

  
    const handleSubmit = async (values) => {
      console.log("Submitting form with values:", values);
      setSubiendo(true);
  
      try {
        const imageUrls = await uploadImagesToCloudinary(); 
  
        const data = {
          id: 0,
          nombre: values.nombre,
          tipoAnimal: values.tipoAnimal,
          raza: values.raza,
          descripcion: values.descripcion,
          sexo: values.sexo,
          tamano: values.tamano,
          temperamentoConAnimales: values.temperamentoConAnimales,
          temperamentoConPersonas: values.temperamentoConPersonas,
          edad: values.edad,
          estado: values.estado,
          ciudad: values.ciudad,
          mesAnioNacimiento: values.mesAnioNacimiento,
          protectoraId: 0,
          fotos: imageUrls,
        };
         
       
  
        
        await axios.post("http://192.168.0.72:8081/api/Mascotas/registro", data);
        console.log("Animal agregado exitosamente");
        navigation.navigate('Login'); 
      } catch (error) {
        console.error("Error al agregar animal:", error);
      } finally {
        setSubiendo(false);
      }
    };

  
    
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
     <Text style={styles.label}>Agregar animal</Text>
      <Formik
         initialValues={{
          nombre: "",
          tipoAnimal: "",
          raza: "",
          descripcion: "",
          sexo: "",
          tamano: "",
          temperamentoConAnimales:"",
          temperamentoConPersonas: "",
          edad:0,
          estado:"",
          ciudad: "",
          mesAnioNacimiento: "",
          protectoraId:"",
          fotos: [],
        }}

        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
    console.log("onSubmit called"); 
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
          handleSubmit: formikHandleSubmit,
          isSubmitting,
          setFieldValue, 
        }) => (
        
          

          <View style={styles.containerInput}>
            <TextInput 
              style={styles.input}
              placeholder="Nombre del animal*"
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              
            />
            {touched.nombre && errors.nombre && 
            <Text style={styles.error}>{errors.nombre}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Raza*"
              value={values.raza}
              onChangeText={handleChange('raza')}
              onBlur={handleBlur('raza')}
             
            />
            {touched.raza && errors.raza && <Text style={styles.error}>{errors.raza}</Text>}
 
            <View style={styles.input}>
                <Picker 
                  selectedValue={values.tipoAnimal}
                  onValueChange={(tipoAnimal) => setFieldValue('tipoAnimal', tipoAnimal)}
                  style={styles.input}
                >
                  <Picker.Item label="Tipo*" value="" />
                  <Picker.Item label="Perro" value="perro" />
                  <Picker.Item label="Gato" value="gato" />
                  <Picker.Item label="Otro" value="otro" />
                </Picker>
            </View>
            {touched.tipoAnimal && errors.tipoAnimal && 
            <Text style={styles.error}>{errors.tipoAnimal}</Text>}

            <View style={styles.input}>
            <Picker
              selectedValue={values.tamano}
              onValueChange={(itemValue) => setFieldValue('tamano', itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Tamaño*" value="" />
              <Picker.Item label="Pequeño" value="pequeño" />
              <Picker.Item label="Mediano" value="mediano" />
              <Picker.Item label="Grande" value="grande" />
            </Picker>
            </View>
            {touched.tamano && errors.tamano && 
            <Text style={styles.error}>{errors.tamano}</Text>}
           
            <TextInput
              style={styles.input}
              placeholder="Carácter con animales*"
              value={values.temperamentoConAnimales}
              onChangeText={handleChange('temperamentoConAnimales')}
              onBlur={handleBlur('temperamentoConAnimales')}
             
            />
            {touched.temperamentoConAnimales && errors.temperamentoConAnimales && 
            <Text style={styles.error}>{errors.temperamentoConAnimales}</Text>}
           
            <TextInput
              style={styles.input}
              placeholder="Carácter con personas*"
              value={values.temperamentoConPersonas}
              onChangeText={handleChange('temperamentoConPersonas')}
              onBlur={handleBlur('temperamentoConPersonas')}
             
            />
            {touched.temperamentoConPersonas && errors.temperamentoConPersonas && 
            <Text style={styles.error}>{errors.temperamentoConPersonas}</Text>}

           <TextInput
              style={styles.input}
              placeholder="Edad*"
              keyboardType="numeric"  
              value={values.edad}
              onChangeText={(text) => setFieldValue('edad', text ? parseInt(text.replace(/[^0-9]/g, ''), 10) : 0)}

              onBlur={handleBlur('edad')}
            />
            {touched.edad && errors.edad && <Text style={styles.error}>{errors.edad}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Estado*"
              value={values.estado}
              onChangeText={handleChange('estado')}
              onBlur={handleBlur('estado')}
            />
            {touched.estado && errors.estado &&
            <Text style={styles.error}>{errors.estado}</Text>}

           
            <TextInput
              style={styles.input}
              placeholder="Ubicación*"
              value={values.ciudad}
              onChangeText={handleChange('ciudad')}
              onBlur={handleBlur('ciudad')}
             
            />
            {touched.ciudad && errors.ciudad && 
            <Text style={styles.error}>{errors.ciudad}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Nacimiento (DD/MM/AAAA)*"
              value={values.mesAnioNacimiento}
              onChangeText={handleChange('mesAnioNacimiento')}
              onBlur={handleBlur('mesAnioNacimiento')}
              
            />
            {touched.mesAnioNacimiento && errors.mesAnioNacimiento && 
            <Text style={styles.error}>{errors.mesAnioNacimiento}</Text>}

            <TextInput
              style={styles.textArea}
              placeholder="Descripcion"
              value={values.descripcion}
              onChangeText={handleChange('descripcion')}
              onBlur={handleBlur('descripcion')}
              multiline
            />

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
            
            <View>
               
                <TouchableOpacity onPress={() => pickImage(setFieldValue)} style={styles.input}>
                  <Text style={styles.imagePickerText}>Cargar imágenes (máximo 10)*</Text>
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
              <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>



          </View>
          
        )}
      </Formik>
    </ScrollView>
  );
};



export default PettAdd;
