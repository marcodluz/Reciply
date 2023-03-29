import { Stack, useRouter } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent", // set header background to transparent
          elevation: 0, // remove elevation/shadow from header
        },
      }}
    >
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};
