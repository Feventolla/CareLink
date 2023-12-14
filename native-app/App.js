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
<<<<<<< HEAD
import RegistrationPage from "./screens/signup";
import Loginpage from "./screens/signin";
import Forgotpassword from "./screens/forgotPassword";
=======
import OnboardingPage1 from './screens/onboarding/OnboardingPage1'
import OnboardingPage2 from './screens/onboarding/OnboardingPage2'
import OnboardingPage3 from './screens/onboarding/OnboardingPage3'
import ProfilePage from "./screens/home/profile";

>>>>>>> e9682fae473071643885a24c399692ee1f6d70cd

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

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
        headerLeft: () => (
          <Icon2
            onPress={() => navigation.navigate("Profile")}
            name="keyboard-arrow-left"
            color="black"
            size={30}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const RootStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="Signup">
    <Stack.Screen
      name="Signin"
      component={Loginpage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={RegistrationPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Forgot"
      component={Forgotpassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chatbot"
      component={ChatScreen}
      // options={{
      //   headerLeft: () => (
      //     <Icon2
      //       onPress={() => navigation.goBack()}
      //       name="keyboard-arrow-left"
      //       color="black"
      //       size={30}
      //     />
      //   ),
      // }}
    />
    <Stack.Screen
      name="MainApp"
      component={MainAppStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainAppStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Landingpage}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
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
);

// const AuthStackScreen = () => (
//   <AuthStack.Navigator initialRouteName="Signup">
//     <AuthStack.Screen
//       name="Signup"
//       component={RegistrationPage}
//       options={{ headerShown: false }}
//     />
//     <AuthStack.Screen
//       name="Signin"
//       component={Loginpage}
//       options={{ headerShown: false }}
//     />
//   </AuthStack.Navigator>
// );

// export default function App() {
//   const userIsAuthenticated = false;

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <RootStack />
=======
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
          component={ProfilePage}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Icon name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
>>>>>>> e9682fae473071643885a24c399692ee1f6d70cd
    </NavigationContainer>
  );
}

// {userIsAuthenticated ? (
//  <Tab.Navigator
//    initialRouteName="Home"
//    inactiveColor="#a0a0a0"
//    barStyle={{ backgroundColor: "white" }}
//    tabBarOptions={{
//      showLabel: false,
//    }}
//  >
//    <Tab.Screen
//      name="Home"
//      component={HomeStackScreen}
//      options={{
//        tabBarLabel: "",
//        tabBarIcon: ({ color }) => (
//          <Icon name="home" color={color} size={26} />
//        ),
//      }}
//    />
//    <Tab.Screen
//      name="Hospital"
//      component={Detaildoctor}
//      options={{
//        tabBarLabel: "",
//        tabBarIcon: ({ color }) => (
//          <Icon name="hospital" color={color} size={26} />
//        ),
//      }}
//    />
//    <Tab.Screen
//      name="Profile"
//      component={ProfileScreen}
//      options={{
//        tabBarLabel: "",
//        tabBarIcon: ({ color }) => (
//          <Icon name="account" color={color} size={26} />
//        ),
//      }}
//    />
//  </Tab.Navigator>
// ) : (
//  <AuthStackScreen />
// )}
