// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import config from "../../../secrets";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

// Define the Search Recipes component
const searchRecipes = () => {

  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Define state variables to store the recipes
  const [recipes, setRecipes] = useState([]);

  // Get the ingredients from the previous screen
  const { ingredients } = useSearchParams();

  // Load the spoonacular api key
  const api_key = config.spoonacular_api_key;

  // Define a function to handle the recipe search
  const handleSearch = async () => {
    try {
      console.log("Searching for recipes with: " + ingredients);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${api_key}&ranking=2&number=2`
      );
      const data = await response.json();
      setRecipes(data);

      // Store the recipes in AsyncStorage
      await AsyncStorage.setItem("recipes", JSON.stringify(data));

      if (ingredients) {

        // Store the ingredients in AsyncStorage
        await AsyncStorage.setItem("ingredients", ingredients);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getRecipes = async () => {
      const savedIngredients = await AsyncStorage.getItem("ingredients");
      const savedRecipes = await AsyncStorage.getItem("recipes");
      if ((savedIngredients === ingredients && savedRecipes) || (ingredients == 1 && savedRecipes)) {
        setRecipes(JSON.parse(savedRecipes));
      } else {
        handleSearch();
      }
    };
    getRecipes();
  }, [ingredients]);

  // Define a function to handle the recipe selection
  const handleRecipeSelect = (recipeID) => {
    console.log("RecipeID: " + recipeID);

    // Navigate to the recipe screen
    router.replace("/home/recipes/recipe?recipeID=" + recipeID);
  };

  // Render the Search Recipes component
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Recipes",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
          },
          headerTransparent: false,
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
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
          ),
        }}
      />
      {recipes &&
        recipes.map((recipe, index) => (
          <TouchableOpacity
            key={`${recipe.id}-${index}`}
            style={styles.recipeContainer}
            onPress={() => handleRecipeSelect(`${recipe.id}`)}
          >
            <ImageBackground
              source={{ uri: recipe.image }}
              style={styles.recipeImage}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                locations={[0, 1]}
                style={styles.recipeImageGradient}
              />
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeDescription}>
                {recipe.missedIngredientCount + recipe.usedIngredientCount}{" "}
                Ingredients | {recipe.missedIngredientCount} missing
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default searchRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
  },
  recipeContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    height: 350,
    marginTop: 30,
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
    marginBottom: 20,
  },
  recipeImageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
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
