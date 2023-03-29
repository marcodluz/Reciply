import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSearchParams } from "expo-router";
import config from '../../secrets';

const recipes = () => {

  const win = Dimensions.get("window");

  const [recipes, setRecipes] = useState([]);

  const { ingredients } = useSearchParams();

  const api_key = config.spoonacular_api_key;

  const handleSearch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${api_key}`
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
      <TouchableOpacity style={{ width: win.width, top: 0 }}>
        <View
          style={{
            flexGrow: 1,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: win.width,
              height: 150,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
              {item.title}
            </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRecipeSelect = (recipe) => {
    // Navigate to detail screen with recipe data
  };

  return (
    <View>
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
