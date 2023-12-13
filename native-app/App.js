import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Landingpage from "./screens/home/landingpage";
import Routing from "./screens/home/routing";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./screens/home/home";
import ProfileScreen from "./screens/home/profile";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // activeColor="#ffffff"
        inactiveColor="#a0a0a0"
        barStyle={{ backgroundColor: "white" }}
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Landingpage}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Hospital"
          component={HomeScreen}
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
    // <Routing style={styles.container} />
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
