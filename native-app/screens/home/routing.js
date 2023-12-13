import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../../screens/home/home";
import ProfileScreen from "../../screens/home/profile";
import Landingpage from "./landingpage";
const Tab = createMaterialBottomTabNavigator();

const Routing = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ffffff"
        inactiveColor="#a0a0a0"
        barStyle={{ backgroundColor: "#6200ee" }}
      >
        <Tab.Screen
          name="Home"
          component={Landingpage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Icon name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
