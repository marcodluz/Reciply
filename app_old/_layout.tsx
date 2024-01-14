import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          //elevation: 0,
        },
      }}
    >
      <Stack.Screen name="pages" options={{ headerShown: false }} />
    </Stack>
  );
};
