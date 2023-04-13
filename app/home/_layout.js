import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000", //Dark preset
        tabBarInactiveTintColor: "#808080", //Dark preset
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
        }, //Light preset
        headerStyle: { backgroundColor: "#FFFFFF" }, //Light preset
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="utensils" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
