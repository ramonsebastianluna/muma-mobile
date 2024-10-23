import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, 
  ActivityIndicator, Alert, Switch 
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import loginImage from "../assets/login.png";
import eye from "../assets/eye.png";
import notVisible from "../assets/Vector.png";
import styles from "./LoginStyles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string("Debe ingresar su usuario")
    .email("Debe ingresar un email válido")
    .required("Usuario es requerido"),
  password: Yup.string()
    .matches(/^\d+$/, "El password debe ser numérico")
    .required("Password es requerido"),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading, token, error } = useSelector((state) => state.login);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values) => {
    const credentials = {
      user: values.email,
      password: values.password,
    }
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (token) {
      navigation.navigate("Home");
    }
  }, [token, navigation]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image source={loginImage} style={styles.logo} />

        <Formik
          initialValues={{ email: "", password: "" }}
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
            handleSubmit: formikHandleSubmit,
            isSubmitting,
          }) => (
            <View>
              <View style={styles.inputGroup}>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email ? styles.inputError : null,
                  ]}
                  placeholder="Email*"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.password && errors.password ? styles.inputError : null,
                    ]}
                    placeholder="Contraseña*"
                    secureTextEntry={!passwordVisible}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      source={passwordVisible ? eye : notVisible}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}

              <View style={styles.actions}>
                <View style={styles.rememberMe}>
                  <Switch
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    thumbColor={rememberMe ? "#F08318" : "#f4f3f4"}
                    trackColor={{ false: "#f4f3f4", true: "#F08318" }}
                  />
                  <Text style={styles.actionsText}>Recordarme</Text>
                </View>
                <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={formikHandleSubmit}
                disabled={isSubmitting}
              >
                {loading ? <Text style={styles.buttonText}>...Cargando</Text> : <Text style={styles.buttonText}>Ingresar</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate("SelectUser")}
              >
                <Text style={styles.createButtonText}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};



export default Login;

