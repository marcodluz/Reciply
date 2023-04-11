// Import necessary components and libraries
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, Stack, Link } from "expo-router";
import { firebase } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Register component
const register = () => {
  
  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Define state variables to store the user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create a reference to the email input field
  const emailRef = useRef(null);

  // Use the useEffect hook to focus on the email input field after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current.focus();
    }, 600);

    // Return a cleanup function to clear the timer if the component unmounts before the timer is complete
    return () => clearTimeout(timer);
  }, []);

  // Define a function to handle user sign-up
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered in with: ", user.email);

        // Store the user ID, email, and password in AsyncStorage
        AsyncStorage.setItem("userID", user.uid);
        AsyncStorage.setItem("userEmail", user.email);
        AsyncStorage.setItem("userPassword", password);

        // Navigate to the home screen
        router.replace("home/recipes/ingredients");
      })
      .catch((error) => alert(error.message));
  };

  // Render the Register component
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-50}
    >
      {/* Define the header for the Register screen */}
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
          },
          headerLeft: () => (
            <AntDesign
              name="back"
              size={24}
              color="lightgrey"
              onPress={() => router.back()}
            />
          ),
        }}
      />

      {/* Define the main content of the Register screen */}
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create a new account.</Text>
          <Text style={styles.subtitle}>Explore thousands of</Text>
          <Text style={styles.subtitle}>world-wide recipes.</Text>
        </View>

        {/* Define the email and password input fields */}
        <View style={styles.inputContainer}>
          <TextInput
            ref={emailRef}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={"none"}
            style={styles.input}
            placeholderTextColor="rgb(200, 200, 200)"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholderTextColor="rgb(200, 200, 200)"
            secureTextEntry
          />
        </View>

        {/* Define the container to hold the "Register" button and the "Login" link */}
        <View style={styles.buttonContainer}>
          <Text style={styles.registerText}>
            Already have an account?{" "}
            <Link href="login" style={styles.registerLink}>
              Login
            </Link>
          </Text>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
  },
  main: {
    flex: 1,
    justifyContent: "flex-top",
    alignItems: "center",
    marginTop: 100,
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 30,
    color: "black",
  },
  inputContainer: {
    alignItems: "center",
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 1,
    color: "black",
    minWidth: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "80%",
    marginTop: 30,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "100%",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "black",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    color: "rgb(100, 100, 100)",
  },
  registerLink: {
    color: "black",
    fontWeight: "600",
  },
});
