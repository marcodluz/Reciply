// Import necessary components and libraries
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

// Export the component Page
export default function Page() {
  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Retrieve the userID from AsyncStorage
  AsyncStorage.getItem("userID").then((userID) => {
    // If the userID exists, redirect the user to the ingredients screen
    if (userID) {
      // Print the userID to the console
      console.log(userID);

      router.replace("/pages/recipes/ingredients");
    }
  });

  // Render the Page component
  return (
    <View style={styles.container}>
      {/* Define the header for the App First screen */}
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View style={styles.main}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/recipeapp-3914c.appspot.com/o/splash-image.png?alt=media&token=a376dcdf-93f7-4d36-bb97-2e48fd12accb",
          }}
          style={styles.splashImage}
        />
        <Text style={styles.title}>Reciply</Text>
        <Text style={styles.subtitle}>Reduce Waste, Cook with Taste!</Text>

        <TouchableOpacity
          onPress={() => {
            // Navigate to the login page when the "Get Started" button is pressed
            router.push("login");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 19,
    color: "#646464",
    marginTop: 10,
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 150,
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "100%",
    marginTop: 50,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
