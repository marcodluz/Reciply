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

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.replace("home");
      }
    });

    return unsubscribe;
  }, []);

  const emailRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current.focus();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
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
              color="white"
              onPress={() => router.back()}
            />
          ), // set custom back button icon
        }}
      />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create a new account.</Text>
          <Text style={styles.subtitle}>Explore thousands of</Text>
          <Text style={styles.subtitle}>world-wide recipes.</Text>
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
            Already have an account?{" "}
            <Link href="login" style={styles.registerLink}>
              Login
            </Link>
          </Text>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
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

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgb(24, 23, 30)",
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
    color: "white",
  },
  subtitle: {
    fontSize: 30,
    color: "white",
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
    backgroundColor: "rgb(29, 28, 34)",
    borderColor: "rgb(80, 80, 80)",
    borderWidth: 1,
    color: "white",
    minWidth: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "80%",
    marginTop: 30,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: "100%",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    color: "rgb(200, 200, 200)",
  },
  registerLink: {
    color: "white",
    fontWeight: "600",
  },
});
