import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const recipe = () => {
  const router = useRouter();

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
      {/* <Text style={styles.recipeTitle}>Salmon Sushi</Text> */}
      <View style={styles.recipeImageContainer}>
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
        </ImageBackground>
      </View>
      <Text style={styles.recipeIngredientsTitle}>Ingredients (12)</Text>
      <View style={styles.ingredientsContainer}>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientImageContainer}>
            <ImageBackground
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/recipeapp-3914c.appspot.com/o/Ingredients%2FMeat%20%26%20Fish%2FBeef.png?alt=media&token=3ddc0f91-6611-4e5c-982c-29806b5fd7c0",
              }}
              style={styles.recipeIngredientImage}
            />
          </View>
          <Text style={styles.ingredientTitle}>Steak</Text>
          <Text style={styles.ingredientQuantity}>200 gr</Text>
        </View>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientImageContainer}>
            <ImageBackground
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/recipeapp-3914c.appspot.com/o/Ingredients%2FMeat%20%26%20Fish%2FBeef.png?alt=media&token=3ddc0f91-6611-4e5c-982c-29806b5fd7c0",
              }}
              style={styles.recipeIngredientImage}
            />
          </View>
          <Text style={styles.ingredientTitle}>Steak</Text>
          <Text style={styles.ingredientQuantity}>200 gr</Text>
        </View>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientImageContainer}>
            <ImageBackground
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/recipeapp-3914c.appspot.com/o/Ingredients%2FMeat%20%26%20Fish%2FBeef.png?alt=media&token=3ddc0f91-6611-4e5c-982c-29806b5fd7c0",
              }}
              style={styles.recipeIngredientImage}
            />
          </View>
          <Text style={styles.ingredientTitle}>Steak</Text>
          <Text style={styles.ingredientQuantity}>200 gr</Text>
        </View>
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
  recipeImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  recipeImage: {
    resizeMode: "cover",
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
    //borderColor: "rgb(230, 230, 230)",
    //borderWidth: 2,
    marginBottom: 30,
    marginTop: 30,
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
  },
  ingredientsContainer: {
    marginTop: 30,
  },
  ingredientContainer: {
    backgroundColor: "rgb(245, 245, 245)",
    height: 70  ,
    paddingVertical: 7.5,
    paddingLeft: 7.5,
    paddingRight: 15,
    borderRadius: 15,
    flexDirection: 'row',
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
  },
  ingredientQuantity: {
    fontSize: 13,
    color: "rgb(150, 150, 150)",
    flex: 0,  
  }
});
