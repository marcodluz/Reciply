import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Recipes",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "600",
            color: "#000000",
          },
        }}
        //options={{ headerShown: false }}
      />
    </Stack>
  );
};
