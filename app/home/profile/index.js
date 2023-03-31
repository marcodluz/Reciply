import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { firebase } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const router = useRouter();

  const handleSignOut = async () => {
    //const userEmail = firebase.auth().currentUser?.email;

    // Define the function that retrieves the saved user ID from AsyncStorage
    const getSavedUserEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        return userEmail;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    firebase
      .auth()
      .signOut()
      .then(async () => {
        router.replace("../../login");
        console.log("Logged out with: ", await getSavedUserEmail());
        AsyncStorage.removeItem("userID");
        AsyncStorage.removeItem("userEmail");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          {/* <Link href="/home/profile/settings">Settings</Link> */}
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.text}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(24, 23, 30)",
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "black",
  },
});