import React, { useState } from "react";
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
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

const RegistrationPage = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleRegister = () => {
    // Handle the login logic here with formData
    console.log("Login Form Data:", formData);

    // For demonstration, navigate to "MainApp"
    navigation.navigate("Signin");
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={require("../assets/logo.jpg")} />
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.subTitle}>Create Your new Account</Text>
      </View>
      <ScrollView
        style={styles.formScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Firstname"
            keyboardType="first-name"
            value={formData.firstname}
            onChangeText={(text) => handleInputChange("firstname", text)}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Lastname"
            keyboardType="last-name"
            value={formData.lastname}
            onChangeText={(text) => handleInputChange("lastname", text)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Gender"
            keyboardType="default"
            value={formData.gender}
            onChangeText={(text) => handleInputChange("gender", text)}
          />
          <Text style={styles.label}>Age</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your Age"
            keyboardType="decimal-pad"
            value={formData.age}
            onChangeText={(text) => handleInputChange("age", text)}
          />
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Weight"
            keyboardType="decimal-pad"
            value={formData.weight}
            onChangeText={(text) => handleInputChange("weight", text)}
          />
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Height"
            keyboardType="decimal-pad"
            value={formData.height}
            onChangeText={(text) => handleInputChange("height", text)}
          />

          <Text style={styles.label}>Photo</Text>
          <View style={styles.file}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.picktext}>Pick Image</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            {/* <TextInput placeholder="choose a photo" /> */}
          </View>
          <View style={{ height: 80 }}></View>
        </View>
      </ScrollView>
      <View style={styles.bottombutton}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.footerText}>
            Already Have an account?{" "}
            <Text style={styles.logincolor}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#EFE9F4",
  },
  formScrollView: {
    // flexGrow: 1,
    paddingTop: 40,
    // paddingBottom: 100,
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

  header: {
    alignItems: "center",
    paddingTop: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    marginTop: 10,
    fontSize: 25,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
  },
  label: {
    color: "#092C4C",
    paddingLeft: 10,
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
  file: {
    backgroundColor: "#EDE5F2",
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    width: 200,
    // height: 100,
    color: "black",
  },
  picktext: {
    color: "gray",
  },
  button: {
    backgroundColor: "#C276F0",
    padding: 10,
    marginTop: 20,
    borderRadius: 7,
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
    color: "gray",
    textAlign: "center",
    // paddingBottom: 30,
    // textDecorationLine: "underline",
  },
  logincolor: {
    color: "#C276F0",
    textDecorationLine: "underline",
  },
});
export default RegistrationPage;
