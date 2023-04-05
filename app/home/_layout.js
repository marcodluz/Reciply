import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default () => {
  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: "white", //Dark preset
        //tabBarInactiveTintColor: "grey", //Dark preset
        //tabBarStyle: { backgroundColor: "rgb(24, 23, 30)", borderTopWidth: 0}, //Dark preset
        //headerStyle: { backgroundColor: "rgb(24, 23, 30)" }, //Dark preset

        tabBarActiveTintColor: "black", //Dark preset
        tabBarInactiveTintColor: "grey", //Dark preset
        tabBarStyle: {
          backgroundColor: "rgb(255, 255, 255)",
          borderTopWidth: 0,
        }, //Light preset
        headerStyle: { backgroundColor: "rgb(255, 255, 255)" }, //Light preset
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
      {/* <Tabs.Screen
        name="recipes"
        // options={
        //   {
        //     tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
        //     tabBarVisible: false, //hide tab bar on this screen
        //   }
        // }
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="search-recipes"
        options={{
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      /> */}
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

      {/* 
          For designing purpose only!
          Place this Tab Screen in first, to test for every update
      */}
      <Tabs.Screen
        name="search-recipes-design"
        options={{
          tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
    </Tabs>
  );
};
