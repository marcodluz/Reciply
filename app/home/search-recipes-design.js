import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Stack, useSearchParams } from "expo-router";
import config from "../../secrets";
import { LinearGradient } from "expo-linear-gradient";

const recipes = () => {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Salmon Sushi",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
          },
          headerTransparent: false,
          headerStyle: {
            backgroundColor: "white", // set header background to transparent
            elevation: 0, // remove elevation/shadow from header
            borderBottomWidth: 0,
            borderBottomColor: "transparent",
          },
          headerLeft: () => (
            <AntDesign
              name="back"
              size={24}
              color="lightgrey"
              onPress={() => router.back()}
            />
          ), // set custom back button icon
        }}
      />
      <Text
        style={{
          width: "100%",
          paddingTop: 70,
          paddingBottom: 20,
          fontSize: 25,
          color: "black",
          fontWeight: "600",
          paddingHorizontal: "5%", // set 10% padding on both sides
          textAlign: "center",
        }}
      >
        Recipes
      </Text>
      <TouchableOpacity style={styles.recipeContainer}>
        <ImageBackground
          source={{
            uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
          }}
          style={styles.recipeImage}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            locations={[0, 1]}
            style={styles.recipeImageGradient}
          />
          <Text style={styles.recipeTitle}>Salmon Sushi Match</Text>
          <Text style={styles.recipeDescription}>12 Ingredients | 40 Min</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "rgb(29, 28, 34)", //Dark preset
    backgroundColor: "rgb(255, 255, 255)", //Ligh preset
  },
  recipeContainer: {
    flex: 1,
    paddingHorizontal: "5%", // set 10% padding on both sides
  },
  recipeImage: {
    flex: 1,
    resizeMode: "cover",
    height: 350,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 25,
    overflow: "hidden",
    //borderColor: "rgb(230, 230, 230)",
    //borderWidth: 2,
    marginBottom: 20,
  },
  recipeImageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%", // set the height of the gradient to 30%
  },
  recipeTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    width: "75%",
  },
  recipeDescription: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 10,
  },
});
