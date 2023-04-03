import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useSearchParams } from "expo-router";
import config from "../../secrets";
import { LinearGradient } from "expo-linear-gradient";

const recipes = () => {

  const [recipes, setRecipes] = useState([]);

  const { ingredients } = useSearchParams();

  const api_key = config.spoonacular_api_key;

  const handleSearch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${api_key}&ranking=1&number=30`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data));

    console.log("Searching for recipes with: " + ingredients);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const renderRecipeItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.recipeContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.recipeImage}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            locations={[0, 1]}
            style={styles.recipeImageGradient}
          />
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeDescription}>{item.usedIngredientCount + item.missedIngredientCount} Ingredients | {item.missedIngredientCount} missing</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const handleRecipeSelect = (recipe) => {
    // Navigate to detail screen with recipe data
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        onPress={handleRecipeSelect}
      />
    </View>
  );
};

export default recipes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(29, 28, 34)",
    paddingTop: 100,
  },
  recipeContainer: {
    flexGrow: 1,
    paddingHorizontal: "10%", // set 10% padding on both sides
  },
  recipeImage: {
    flex: 1,
    resizeMode: "cover",
    height: 350,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "rgb(230, 230, 230)",
    borderWidth: 2,
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
