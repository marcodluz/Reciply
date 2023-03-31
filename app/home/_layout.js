import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {backgroundColor: "rgb(24, 23, 30)"},
        headerStyle: {backgroundColor: "rgb(24, 23, 30)"},
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="panel"
        options={{
          title: "Ingredients",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search-recipes"
        options={{
          tabBarButton: () => (
              <View style={{width:0, height:0}}></View>
          ),
          tabBarVisible:false //hide tab bar on this screen
  
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
