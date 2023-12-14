import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Loginpage = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.backgroundCircles}>
        <View style={[styles.circle, styles.topLeftCircle]} />
        <View style={[styles.circle, styles.topRightCircle]} />
      </View>

      <View style={styles.header}>
        <Image style={styles.avatar} source={require("../assets/splash.png")} />
        <Text style={styles.title}>Login to your account</Text>
        {/* <Text style={styles.subTitle}>Create Your Account</Text> */}
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Firstname" />
        <TextInput style={styles.input} placeholder="Lastname" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Height"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          secureTextEntry={true}
        />

        {/* Replaced with a simple text input for demonstration */}
        <TextInput style={styles.input} placeholder="Image URL" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("MainApp");
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.footerText}>Don't have an Account? Signup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundCircles: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  topLeftCircle: {
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    position: "absolute",
    top: -100,
    left: -100,
  },
  topRightCircle: {
    backgroundColor: "rgba(0, 255, 0, 0.5)",
    position: "absolute",
    top: -100,
    right: -100,
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 6,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
export default Loginpage;
