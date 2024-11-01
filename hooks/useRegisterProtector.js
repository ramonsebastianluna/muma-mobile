import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import axios from "axios";
import Constants from 'expo-constants';

const useRegisterProtector = () => {
  const navigation = useNavigation();

  const sendEmail = async (nameProtector) => {
    try {
      const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: Constants.expoConfig.extra.SERVICE_ID,
        template_id: Constants.expoConfig.extra.TEMPLATE_ID,
        user_id: Constants.expoConfig.extra.PUBLIC_KEY,
        template_params: {
          nameProtector: nameProtector,
        },
      });
  
      return response.status === 200 ? "SUCCESS" : "ERROR";
  
    } catch (error) {
      console.error("Error en el envío del email:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : error.message;
    }
  }

  const registerProtector = async (dataUser) => {
    const dataFormated = {
      email: dataUser.email,
      password: dataUser.password,
      nombreUsuario: "Juan",
      apellidoUsuario: "Perez",
      nombreProtectora: dataUser.nameProtector,
      descripcion: dataUser.description,
      sitioWeb: dataUser.webSite,
      instagram: dataUser.instagram,
      facebook: dataUser.facebook,
      cantidadDeMascotas: 20,
      direccion: {
        idCiudad: dataUser.city,
        calle: dataUser.street,
        numero: dataUser.number,
        piso: dataUser.floor,
        departamento: dataUser.apartment,
        provincia: {
          id: 0,
          nombre: "string"
        },
        ciudad: {
          id: 0,
          nombre: "string",
          idProvincia: 0
        }
      }
    }
    
    try {
      const response = await api.post("/Protectoras/registro", dataFormated);
      console.log("Response:", response);

      //Llamar a sendEmail y esperar su respuesta
      const emailStatus = await sendEmail(dataUser.nameProtector);
      if (emailStatus === "SUCCESS") {
        navigation.navigate('AccountValidation');
      } else {
        console.error("Error al enviar el email:", emailStatus);
      }
    } catch (error) {
      console.log('El error es: ' + error);
    
      if (error) {
        try {
          //const response = JSON.parse(error);
          //console.log("Error:", error.response.data.errors);
          console.log('La respuesta es: ' + error.response.data.errors);
    
          if (error.response.data.errors && error.response.data.errors.includes("Ya existe un usuario registrado con esa dirección de email")) {
            navigation.navigate('RegisterRefused');
          } else {
            console.error("Error:", response.errors);
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta:", parseError);
        }
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    }
  };

  return { registerProtector };
};

export default useRegisterProtector;
