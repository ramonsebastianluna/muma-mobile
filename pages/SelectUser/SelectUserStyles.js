
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerRol: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerArriba: {
    alignItems: "center",
    position: "relative",
    left: -50,
    top: -35,
  },
  containerAbajo: {
    alignItems: "center",
    position: "relative",
    left: 50,
    top: 35,
  },
  btnMascotero: {
    width: 153,
    height: 153,
    borderRadius: 76.5, 
    backgroundColor: "#F3E9EC", 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
  },
  btnProtectora: {
    width: 153,
    height: 153,
    borderRadius: 76.5,
    backgroundColor: "#F08318",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
  puntosArriba: {
    position: "absolute",
    top: -80,
    left: width * 0.35, 
    transform: [{ translateX: -width * 0.35 }, { rotate: "-5deg" }],
  },
  puntosAbajo: {
    position: "absolute",
    top: 80,
    left: width * 0.3, 
    transform: [{ translateX: -width * 0.35 }, { rotate: "-30deg" }], 
  },
  imgArriba: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  imgAbajo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default styles;
