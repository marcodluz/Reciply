// Import necessary components and libraries
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useRouter, Stack, useSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import config from "../../../secrets";

// Define the  Recipe component
const recipe = () => {

  // Use the useRouter hook from expo-router to navigate between screens
  const router = useRouter();

  // Load the spoonacular api key
  const api_key = config.spoonacular_api_key;

  // Get the recipe ID from the previous screen
  const { recipeID } = useSearchParams();

  // Define state variables to store the recipe ingredients and instructions
  const [recipeData, setRecipeData] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState([]);

  // Define a function to pull the recipe ingredients from the Spoonacular API
  useEffect(() => {
    console.log("Loading recipeID: " + recipeID);
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${api_key}`
      );
      const data = await response.json();
      setRecipeData(data);
    };

    fetchRecipe();
  }, []);

  // Define a function to pull the recipe instructions from the Spoonacular API
  useEffect(() => {
    console.log("Loading Instructions recipeID: " + recipeID);
    const fetchRecipeInstructions = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${api_key}`
      );
      const data = await response.json();

      setRecipeInstructions(data.length > 0 ? data[0].steps : []);
    };

    fetchRecipeInstructions();
  }, []);

  // Render the Recipe component
  return (
    <ScrollView style={styles.container}>
      {/* Define the header for the Recipe's screen */}
      <Stack.Screen
        options={{
          title: recipeData?.title || `${recipeID}`,
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
              onPress={() =>
                router.replace("/home/recipes/search-recipes?ingredients=" + 1)
              }
            />
          ),
        }}
      />
      {/* <ImageBackground
          source={{
            uri: recipeData?.image,
          }}
          style={styles.recipeImage}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            locations={[0, 1]}
            style={styles.recipeImageGradient}
          />
        </ImageBackground> */}
      <Text style={styles.recipeIngredientsTitle}>
        Ingredients ({recipeData?.extendedIngredients?.length || "N/A"})
      </Text>
      <View style={styles.ingredientsContainer}>
        {recipeData?.extendedIngredients?.map((ingredient, index) => (
          <View style={styles.ingredientContainer} key={index}>
            {/* <View style={styles.ingredientImageContainer}>
              <ImageBackground
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                }}
                style={styles.recipeIngredientImage}
              />
            </View> */}
            <Text style={styles.ingredientTitle}>{ingredient.name}</Text>
            <Text style={styles.ingredientQuantity}>
              {ingredient.amount} {ingredient.unit}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.recipeIngredientsTitle}>
        Steps ({recipeInstructions?.length || "N/A"})
      </Text>
      <View style={styles.instructionsContainer}>
        {recipeInstructions?.map((step, index) => (
          <View style={styles.instructionContainer} key={index}>
            <Text style={styles.instructionNumber}>
              {step.number}. {step.step}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    paddingHorizontal: "10%",
  },
  recipeImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
    borderColor: "red",
    borderWidth: 2,
    marginBottom: 20,
  },
  recipeTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  recipeIngredientsTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginTop: 20,
  },
  ingredientsContainer: {
    marginTop: 30,
  },
  ingredientContainer: {
    backgroundColor: "rgb(245, 245, 245)",
    height: 70,
    paddingVertical: 7.5,
    paddingLeft: 7.5,
    paddingRight: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ingredientImageContainer: {
    backgroundColor: "white",
    width: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  recipeIngredientImage: {
    width: 35,
    height: 35,
  },
  ingredientTitle: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "400",
    flex: 1,
    textTransform: "capitalize",
  },
  ingredientQuantity: {
    fontSize: 13,
    color: "rgb(150, 150, 150)",
    flex: 0,
  },

  instructionsContainer: {
    marginTop: 30,
    height: "auto",
  },
  instructionContainer: {
    backgroundColor: "rgb(245, 245, 245)",
    minHeight: 70,
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  }, 
  instructionsTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    height: "auto",
  },
});
