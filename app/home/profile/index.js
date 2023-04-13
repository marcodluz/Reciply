// Import necessary components and libraries
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { firebase } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define and export the Prfile component
export default function Page() {

  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Define a function to handle the user's sign out
  const handleSignOut = async () => {

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
        AsyncStorage.removeItem("userPassword");
      })
      .catch((error) => alert(error.message));
  };

  // Define a function to handle the user's account deletion
  const handleDeleteAccount = async () => {
    try {
      const userID = await AsyncStorage.getItem("userID");
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userPassword = await AsyncStorage.getItem("userPassword");

      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword);

      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account\?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              console.log(userID);

              async function deleteDocumentAndSubcollection(userID) {
                const subcollectionRef = firebase
                  .firestore()
                  .collection("users")
                  .doc(userID)
                  .collection("saved-ingredients");

                const snapshot = await subcollectionRef.get();
                snapshot.docs.forEach(async (doc) => {
                  await doc.ref.delete();
                });

                await firebase
                  .firestore()
                  .collection("users")
                  .doc(userID)
                  .delete();
              }
              await deleteDocumentAndSubcollection(userID);

              // Delete user account from Firebase
              await userCredential.user.delete();

              // Remove saved user ID, email, and password from AsyncStorage
              await AsyncStorage.removeItem("userID");
              await AsyncStorage.removeItem("userEmail");
              await AsyncStorage.removeItem("userPassword");

              // Redirect to login page
              router.replace("../../login");

              console.log("Account deleted successfully\!");
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          {/* <Link href="/home/profile/settings">Settings</Link> */}
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.buttonDelete}
          >
            <Text style={styles.textDelete}>Delete Account</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonDelete: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderColor: "rgba(255, 0, 0, 0.7)",
    borderWidth: 2,
  },
  buttonDelete: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderColor: "rgba(255, 0, 0, 0.7)",
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  textDelete: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "rgba(255, 0, 0, 0.7)",
  },
});
