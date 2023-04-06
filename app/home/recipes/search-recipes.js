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

const searchRecipes = () => {
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const { ingredients } = useSearchParams();
  const api_key = config.spoonacular_api_key;

  const handleSearch = async () => {
    try {
      console.log("Searching for recipes with: " + ingredients);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${api_key}&ranking=2&number=2`
      );
      const data = await response.json();
      setRecipes(data);

      await AsyncStorage.setItem("recipes", JSON.stringify(data));

      if (ingredients) {
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

  const handleRecipeSelect = (recipeID) => {
    // Navigate to detail screen with recipe data
    console.log("RecipeID: " + recipeID);
    router.replace("/home/recipes/recipe?recipeID=" + recipeID);
  };

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
    //backgroundColor: "rgb(29, 28, 34)", //Dark preset
    backgroundColor: "rgb(255, 255, 255)", //Ligh preset
  },
  recipeContainer: {
    flex: 1,
    paddingHorizontal: "5%", // set 10% padding on both sides
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
