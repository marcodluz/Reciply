import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  subHeaderText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6a7289",
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
    columnGap: 10,
  },
  menuButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    minWidth: "35%",
    marginBottom: 10,
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    alignItems: "flex-start",
    gap: 30,
  },
  menuIcon: {
    color: "#656d85",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#656d85", // Use the actual color from your design
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  analysisButton: {
    backgroundColor: "#007bff", // Use the actual color from your design
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default styles;
