import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "white", // set header background to transparent
          elevation: 0, // remove elevation/shadow from header
          borderBottomWidth: 0,
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="ingredients"
        options={{
          title: "Your Ingredients",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "600",
            color: "black",
          },
          headerStyle: {
            marginBottom: 10, // set your desired margin bottom here
          },
        }}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-recipes"
        //options={{ headerShown: false }}
      />
      <Stack.Screen name="recipe" options={{ headerShown: false }} />
    </Stack>
  );
};