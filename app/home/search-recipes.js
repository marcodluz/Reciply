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

const recipes = () => {
  const win = Dimensions.get("window");

  const [recipes, setRecipes] = useState([]);

  const { ingredients } = useSearchParams();

  const api_key = config.spoonacular_api_key;

  const handleSearch = () => {
    const app_id = "c1118a28";
    const app_key = "edb85fdc15be340efba11c5f25c49c67";

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${app_id}&app_key=${app_key}`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.hits.map((hit) => hit.recipe)))
      .catch((error) => console.error(error));

    console.log("Searching for recipes with: " + ingredients);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const renderRecipeItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: win.width, top: 89 }}>
        <View
          style={{
            flexGrow: 1,
            width: "80%",
            justifyContent: "center",
            marginBottom: 10,
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <ImageBackground
            source={{ uri: item.image.url }}
            style={{
              height: 350,
              borderRadius: 5,
              overflow: "hidden",
            }}
            tint="dark"
          >
            <View
              style={{
                flex: 1,
                // backgroundColor: "rgba(0,0,0, 0.60)",
                justifyContent: "flex-end",
                paddingLeft: 20,
                paddingBottom: 20,
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 25,
                  width: "80%",
                }}
              >
                {item.label}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRecipeSelect = (recipe) => {
    // Navigate to detail screen with recipe data
    console.log("Selected recipe: ", recipe);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.uri}
        onPress={handleRecipeSelect}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </View>
  );
};

export default recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(24, 23, 30)",
  },
});
