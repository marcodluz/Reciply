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
          marginBottom: -34,
        }, //Light preset
        headerStyle: { backgroundColor: "#FFFFFF" }, //Light preset
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="utensils" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
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
