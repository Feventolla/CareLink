
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Landingpage from "./screens/home/landingpage";
import ProfileScreen from "./screens/home/profile";
import ChatScreen from "./screens/home/chatbot_convo";
import Detaildoctor from "./screens/home/detail_doctor";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen
      name="Home"
      component={Landingpage}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="Chatbot"
      component={ChatScreen}
      options={{
        // headerShown: false,
        headerLeft: () => (
          <Icon2
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            color="black"
            size={30}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        inactiveColor="#a0a0a0"
        barStyle={{ backgroundColor: "white" }}
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen} // Use the HomeStackScreen as the component
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Hospital"
          component={Detaildoctor}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Icon name="hospital" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Icon name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




