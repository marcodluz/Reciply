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

const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       router.replace("home");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const emailRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current.focus();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);

        // Store the user ID in AsyncStorage
        AsyncStorage.setItem("userID", user.uid);
        AsyncStorage.setItem("userEmail", user.email);
        AsyncStorage.setItem("userPassword", password);
        router.replace("home/recipes/ingredients");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-50}
    >
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent", // set header background to transparent
            elevation: 0, // remove elevation/shadow from header
          },
          headerLeft: () => (
            <AntDesign
              name="back"
              size={24}
              color="lightgrey"
              onPress={() => router.push("./")}
            />
          ), // set custom back button icon
        }}
      />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Let's sign you in.</Text>
          <Text style={styles.subtitle}>Welcome back.</Text>
          <Text style={styles.subtitle}>You've been missed!</Text>
        </View>

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

        <View style={styles.buttonContainer}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Link href="register" style={styles.registerLink}>
              Register
            </Link>
          </Text>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity> */}
        </View>
        {/* <Button onPress={() => router.back()} title="Go back"></Button> */}
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
    backgroundColor: "white",
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