import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "../../../styles/DashboardScreenStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

const profilePic = require("../../../../assets/images/icon.png");

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi Marco</Text>
        <Image source={profilePic} style={styles.profileImage} />
      </View>
      <Text style={styles.subHeaderText}>What would you like to view?</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="carrot" size={35} style={styles.menuIcon} />
          <Text style={styles.menuText}>Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="utensils" size={35} style={styles.menuIcon} />
          <Text style={styles.menuText}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="shopping-cart" size={35} style={styles.menuIcon} />
          <Text style={styles.menuText}>Shopping List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="cog" size={35} style={styles.menuIcon} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
