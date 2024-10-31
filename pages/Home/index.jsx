import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../auth/authSlice";
import { getPets, getProtector } from "./petSlice";
import { useDispatch, useSelector } from "react-redux";
import toggleButton from "../../assets/home/bar-chart.png";
import profile from "../../assets/home/profile.png";
import add from "../../assets/home/add.png";
import PetCard from "../PettCard";
import ProtectorCard from "../ProtectorCard";
import iconSearch from "../../assets/iconSearch.png";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Gato", icon: "🐱" },
  { id: 2, name: "Perro", icon: "🐶" },
  { id: 3, name: "Hamster", icon: "🐹" },
  { id: 4, name: "Conejo", icon: "🐰" },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, role, loading } = useSelector((state) => state.login);
  const { petsAvailable, protectorsAvailable } = useSelector(
    (state) => state.pets
  );

  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  /**Logica del buscador */
  const handleSearch = () => {
    const filtered =petsAvailable.filter((pet) =>
      pet.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  /** */
  const handleTypeFilter = (type) => {
    setSelectedType(type);
    const filtered = petsAvailable.filter(
      (pet) => pet.tipoAnimal.toLowerCase() === type.toLowerCase()
    );
    setFilteredPets(filtered);
  };

  /** */

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  useEffect(() => {
    dispatch(getPets());
    dispatch(getProtector());
  }, []);

  const toggleOffcanvas = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(!isVisible));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={toggleOffcanvas}>
              <Image
                style={styles.navbar__btnOffCanvas}
                source={toggleButton}
              />
            </TouchableOpacity>
            <Image style={styles.navbar__profileImg} source={profile} />
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
      
          <TextInput
            style={styles.searchInput}
            placeholder="Nombre; estado, protectora y sexo"
            placeholderTextColor="#D8D8D8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image source={iconSearch} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

       
        <View>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedType === category.name &&
                    styles.categoryItemSelected,
                ]}
                onPress={() => handleTypeFilter(category.name)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
       

        <View>
          <Text style={styles.sectionTitle}>Animales</Text>
            {filteredPets.length > 0 ? (
              <ScrollView horizontal>
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    img={pet.fotos[0]}
                    name={pet.nombre}
                    city={pet.ciudad}
                    sex={pet.sexo}
                  />
                ))}
              </ScrollView>
            ) : petsAvailable.length > 0 ? (
              <ScrollView horizontal>
                {petsAvailable.map((pet) => (
                  <PetCard
                    key={pet.id}
                    id = {pet.id}
                    img={pet.fotos[0]}
                    name={pet.nombre}
                    city={pet.ciudad}
                    sex={pet.sexo}
                  />
                ))}
              </ScrollView>
            ) : loading ? (
              <Text style={{ textAlign: "center" }}>
                No hay mascotas disponibles
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                Cargando...
              </Text>
            )}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Protectoras</Text>
        </View>

        <View>
          <ScrollView horizontal style={styles.protectorCardContainer}>
            {protectorsAvailable.map((protector) => (
              <ProtectorCard
                key={protector.id}
                protectorName={protector.nombreProtectora}
                protectorDesc={protector.descripcion}
                protectorMail={protector.email}
                protectorInstagram={protector.instagram}
              />
            ))}
          </ScrollView>
        </View>

        {role === "Protectora" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("PettAdd")}
            style={styles.addBtn}
          >
            <Image source={add} />
          </TouchableOpacity>
        )}
      </SafeAreaView>

      <Animated.View
        style={[styles.offcanvas, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.offcanvasText}>App creada por Hilda y Seba</Text>
        <TouchableOpacity onPress={toggleOffcanvas} style={styles.closeButton}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 10,
            width: 200,
            marginTop: 20,
            marginBottom: 20,
          }}
          onPress={handleLogout}
        >
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  safeArea: {
    position: "relative",
    height: "%100",
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 10,
  },
  navbar: {
    display: "flex",
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar__profileImg: {
    width: 65,
    height: 65,
  },
  navbar__btnOffCanvas: {
    width: 40,
    height: 40,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  offcanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.8,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  offcanvasText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4757",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 20,
    paddingLeft: 20,
  },
  categoryItemSelected: {
    backgroundColor: "#d0e1f9",
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 5,

  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    color:'#5F5B5B',
    fontWeight: "bold",
    marginBottom:10,
    marginTop:20,
    paddingLeft: 20,
  },
  protectorCardContainer: {
    marginHorizontal: 20,

  },
});

export default Home;
