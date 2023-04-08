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

const recipe = () => {
  const router = useRouter();

  const api_key = config.spoonacular_api_key;

  const { recipeID } = useSearchParams();

  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    console.log("Loading recipeID: " + recipeID);
    const fetchRecipe = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${api_key}`);
      const data = await response.json();
      setRecipeData(data);
    };

    fetchRecipe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: recipeData?.title || `${recipeID}`,
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
              onPress={() => router.replace("/home/recipes/search-recipes?ingredients=" + 1)}
            />
          ), // set custom back button icon
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
      <Text style={styles.recipeIngredientsTitle}>Ingredients ({recipeData?.extendedIngredients?.length || "N/A"})</Text>
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
            <Text style={styles.ingredientQuantity}>{ingredient.amount} {ingredient.unit}</Text>
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
    //backgroundColor: "rgb(29, 28, 34)", //Dark preset
    backgroundColor: "rgb(255, 255, 255)", //Ligh preset
    //paddingTop: 57,
    paddingHorizontal: "10%", // set 10% padding on both sides
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
    //color: "white", //Dark preset
    color: "black", //Ligh preset
    fontWeight: "bold",
    fontSize: 25,
    //backgroundColor: "red",
    textAlign: "center",
  },
  recipeIngredientsTitle: {
    //color: "white", //Dark preset
    color: "black", //Ligh preset
    fontWeight: "bold",
    fontSize: 20,
    //backgroundColor: "red",
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
});
