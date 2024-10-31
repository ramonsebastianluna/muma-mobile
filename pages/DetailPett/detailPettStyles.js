import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 50,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  petImage: {
    width: "100%",
    height: "100%",
  },

  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5F5B5B",
  },
  locationText: {
    color: "#888",
    marginBottom: 40,
  },
  statusBadge: {
    backgroundColor: "#E5E0F8",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#9747FF",
    alignItems: "center",
  },
  statusText: {
    color: "#9747FF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  infoItem: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 8,
    color: "#5F5B5B",
  },
  shelterInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  protectorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
  },
  shelterText: {
    fontWeight: "bold",
  },
  description: {
    color: "#666",
    marginVertical: 10,
  },
  adoptButton: {
    backgroundColor: "#F08318",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  infoSegItem: {
    color: "#B1B1B1",
  },
  description: {
    color: "#C2C2C2",
  },
});

export default styles;
