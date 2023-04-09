import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { firebase } from "../../../firebase";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const panel = () => {
  const router = useRouter();

  const scrollViewRef = useRef(null);
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
  const buttonRefs = useRef([]);

  AsyncStorage.getItem("userID").then((userID) => {
    if (userID) {
      console.log(userID);
    }
  });

  const getSavedUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userID");
      return userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const [ingredients, setIngredients] = useState([]);
  const ingredientRef = firebase.firestore().collection("ingredients");
  useEffect(() => {
    const unsubscribe = ingredientRef.onSnapshot((querySnapshot) => {
      const ingredients = [];
      querySnapshot.forEach((doc) => {
        const { name, image, category } = doc.data();
        ingredients.push({
          id: doc.id,
          name,
          image,
          category,
        });
      });
      setIngredients(ingredients);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ingredientsByCategory = ingredients.reduce((acc, ingredient) => {
    const categoryName = ingredient.category;

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(ingredient);

    acc[categoryName].sort((a, b) => a.name.localeCompare(b.name));

    return acc;
  }, {});

  const [savedIngredients, setSavedIngredients] = useState([]);
  useEffect(() => {
    const getSavedIngredients = async () => {
      const userId = await getSavedUserId();
      if (userId) {
        const savedIngredientsRef = firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("saved-ingredients");

        const unsubscribe = savedIngredientsRef
          .orderBy("addedAt", "asc")
          .onSnapshot((querySnapshot) => {
            const savedIngredients = [];
            querySnapshot.forEach((doc) => {
              const { name, addedAt } = doc.data();
              savedIngredients.push({
                id: doc.id,
                name,
                addedAt,
              });
            });
            setSavedIngredients(savedIngredients);

            if (savedIngredients.length > 2) {
              setSubmitButtonVisible(true);
            } else {
              setSubmitButtonVisible(false);
            }
          });

        return () => {
          unsubscribe();
        };
      }
    };

    getSavedIngredients();
  }, []);

  const handleIngredientClick = async (ingredientId) => {
    const ingredient = ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );
    const ingredientName = ingredient.name;
    const userId = await getSavedUserId();
    if (userId) {
      const savedIngredientsRef = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("saved-ingredients");

      savedIngredientsRef
        .doc(ingredientId)
        .set({
          name: ingredientName,
          addedAt: new Date().toLocaleString(),
        })
        .then(() => {
          console.log("+1 " + ingredientId);
        })
        .catch((error) => {
          console.error("Error adding ingredient:", error);
        });
    }
  };

  const handleRemoveIngredientClick = async (savedIngredientId) => {
    const userId = await getSavedUserId();
    if (userId) {
      const savedIngredientsRef = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("saved-ingredients");

      savedIngredientsRef
        .doc(savedIngredientId)
        .delete()
        .then(() => {
          console.log("-1 " + savedIngredientId);
        })
        .catch((error) => {
          console.error("Error removing ingredient:", error);
        });
    }
  };

  function IngredientButton({ savedIngredient }) {
    const [ingredientData, setIngredientData] = useState(null);

    useEffect(() => {
      const ingredientRef = firebase
        .firestore()
        .collection("ingredients")
        .doc(savedIngredient.id);

      const unsubscribe = ingredientRef.onSnapshot((doc) => {
        if (doc.exists) {
          setIngredientData(doc.data());
        } else {
          console.log("Ingredient not found!");
        }
      });

      return () => unsubscribe();
    }, [savedIngredient.id]);

    if (!ingredientData) {
      return null;
    }

    return (
      <TouchableOpacity
        key={savedIngredient.id}
        style={[styles.button, { backgroundColor: "rgb(245, 245, 245)" }]}
        onPress={() => handleRemoveIngredientClick(savedIngredient.id)}
      >
        <Image
          style={{ width: 40, height: 40, marginBottom: 2 }}
          source={{ uri: `${ingredientData.image}` }}
        />
        <Text style={styles.buttonText}>{ingredientData.name}</Text>
      </TouchableOpacity>
    );
  }

  const [categoryVisibility, setCategoryVisibility] = useState({});

  const toggleCategoryVisibility = (categoryName) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [categoryName]: !prevVisibility[categoryName],
    }));
  };

  // Get the saved ingredients into a string joined by commas
  const ingredientsString = savedIngredients.map((item) => item.name).join(",");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        ref={scrollViewRef}
      >
        <View
          style={styles.buttonContainer}
          onLayout={(event) =>
            buttonRefs.current.push(event.nativeEvent.layout)
          }
        >
          {savedIngredients.length === 0 ? (
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "500",
                textAlign: "center",
                paddingTop: 20,
                paddingBottom: 50,
              }}
            >
              Let's go, add some ingredients!
            </Text>
          ) : (
            savedIngredients.map((savedIngredient) => (
              <IngredientButton
                key={savedIngredient.id}
                savedIngredient={savedIngredient}
                onRemove={handleRemoveIngredientClick}
              />
            ))
          )}
        </View>
        <View
          style={styles.buttonContainer}
          onLayout={(event) =>
            buttonRefs.current.push(event.nativeEvent.layout)
          }
        >
          <Text
            style={{
              width: "100%",
              paddingBottom: 15,
              fontSize: 15,
              color: "black",
              fontWeight: "600",
            }}
          >
            <FontAwesome name="angle-down" size={15} color="black" /> List of
            ingredients
          </Text>
          {Object.entries(ingredientsByCategory).map(
            ([categoryName, categoryIngredients]) => (
              <View
                key={categoryName}
                style={{
                  width: "100%",
                  backgroundColor: "rgb(220, 220, 220)",
                  paddingLeft: 10,
                  paddingTop: 14,
                  paddingRight: 10,
                  paddingBottom: 10,
                  borderRadius: 5,
                  marginBottom: 1,
                }}
              >
                <TouchableOpacity
                  style={{}}
                  onPress={() => toggleCategoryVisibility(categoryName)}
                >
                  <Text
                    style={{
                      color: "black",
                      paddingBottom: 5,
                      fontWeight: "500",
                    }}
                  >
                    {categoryName}
                  </Text>
                </TouchableOpacity>
                {categoryVisibility[categoryName] && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {categoryIngredients.map((ingredient) => (
                      <TouchableOpacity
                        key={ingredient.id}
                        style={[
                          styles.button,
                          {
                            backgroundColor: "rgb(245, 245, 245)",
                            paddingTop: 23,
                            paddingBottom: 23,
                          },
                        ]}
                        onPress={() => handleIngredientClick(ingredient.id)}
                      >
                        <Image
                          style={{ width: 40, height: 40, marginBottom: 2 }}
                          source={{ uri: `${ingredient.image}` }}
                        />
                        <Text style={styles.buttonText}>{ingredient.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )
          )}
        </View>
      </ScrollView>

      {submitButtonVisible ? (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            router.push(
              "/home/recipes/search-recipes?ingredients=" + ingredientsString
            )
          }
        >
          <Text style={styles.submitButtonText}>Search Recipes</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
  },
  scrollViewContainer: {
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: "32%",
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    marginTop: 12,
  },
  submitButton: {
    position: "absolute",
    bottom: 30,
    height: 50,
    backgroundColor: "#14CC60",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default panel;
