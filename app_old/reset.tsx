import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { firebase } from "../firebase";

const PasswordResetScreen = () => {
  const [email, setEmail] = useState("");

  const sendPasswordResetEmail = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Enter your email address:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ width: 200, height: 40, borderWidth: 1 }}
      />
      <Button
        title="Send Password Reset Email"
        onPress={sendPasswordResetEmail}
      />
    </View>
  );
};

export default PasswordResetScreen;
