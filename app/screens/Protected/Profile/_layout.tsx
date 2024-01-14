import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          borderBottomWidth: 0,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "600",
            color: "#000000",
          },
          headerStyle: {
            marginBottom: 10,
          },
        }}
        //options={{ headerShown: false }}
      />
    </Stack>
  );
};
