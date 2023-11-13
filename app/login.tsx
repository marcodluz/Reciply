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

// Define Login functional component
const login = () => {
  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Define state variables to store the user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create a reference to the email input field
  const emailRef = useRef<TextInput>(null);

  // Use the useEffect hook to focus on the email input field after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if emailRef.current is not null before calling focus
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 600);

    // Return a cleanup function to clear the timer if the component unmounts before the timer is complete
    return () => clearTimeout(timer);
  }, []);

  // Define a function to handle user login
  const handleLogin = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        // Add a null check for user
        if (userCredentials.user) {
          const user = userCredentials.user;
          console.log("Logged in with: ", user.email);

          // Store the user ID, email, and password in AsyncStorage
          await AsyncStorage.setItem("userID", user.uid!); // await is used here for AsyncStorage.setItem
          await AsyncStorage.setItem("userEmail", user.email!);
          await AsyncStorage.setItem("userPassword", password);

          // Navigate to the home screen
          router.replace("home/recipes/ingredients");
        } else {
          // Handle the case where user is null
          console.error("No user found after sign-in");
          // You may want to throw an error or set an error state here
        }
      })
      .catch((error) => alert(error.message));
  };

  // Render the Login component
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-50}
    >
      {/* Define the header for the Login screen */}
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerStyle: {
            //elevation: 0,
          },
          headerLeft: () => (
            <AntDesign
              name="back"
              size={24}
              color="#D3D3D3"
              onPress={() => router.push("./")}
            />
          ),
        }}
      />

      {/* Define the main content of the Login screen */}
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Let's sign you in.</Text>
          <Text style={styles.subtitle}>Welcome back.</Text>
          <Text style={styles.subtitle}>You've been missed!</Text>
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
            placeholderTextColor="#C8C8C8"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholderTextColor="#C8C8C8"
            secureTextEntry
          />
          <Text style={styles.resetText}>
            <Link href="reset" style={styles.registerLink}>
              Forgot your password?
            </Link>
          </Text>
        </View>

        {/* Define the container to hold the "Login" button and the "Register" link */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Link href="register" style={styles.registerLink}>
              Register
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 30,
    color: "#000000",
  },
  inputContainer: {
    alignItems: "center",
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#C8C8C8",
    borderWidth: 1,
    color: "#000000",
    minWidth: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "80%",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "100%",
    marginBottom: 20,
  },
  buttonOutline: {
    backgroundColor: "#000000",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  resetText: {
    marginTop: 10,
  },
  registerText: {
    color: "#646464",
  },
  registerLink: {
    color: "#000000",
    fontWeight: "600",
  },
});
