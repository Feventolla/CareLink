import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useSignupMutation } from "../../services/Auth/auth-api";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [signup, { isLoading }] = useSignupMutation();
  const [validationErrors, setErrors] = useState({});
  const [EmailError, setEmailError] = useState();

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.signupContainer}>
          <ActivityIndicator size="large" color="#C276F0" />
          <Text>Registering User...</Text>
        </View>
        {/* Render the blurred signup page */}
        <View style={styles.blurOverlay} />
      </View>
    );
  }

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.firstname.trim()) {
      newErrors.name = "First Name is required,Please enter FirstName";
    }
    if (!formData.lastname.trim()) {
      newErrors.name = "Last Name is required ,Please enter LastName";
    }
    if (!formData.weight.trim()) {
      newErrors.name = "Weight is required ,Please enter Weight value";
    }
    if (!formData.height.trim()) {
      newErrors.name = "height is required ,Please enter Height value";
    }
    if (!formData.age.trim()) {
      newErrors.name = "Age is required ,Please enter an Age";
    }
    // if (!formData.gender.trim()) {
    //   newErrors.name = "Gender is required ,Please enter your Gender";
    // }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required ,Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required ,Please enter a password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const {
          firstname,
          lastname,
          email,
          password,

          age,
          weight,
          height,
        } = formData;
        const photo = selectedImage;

        // Perform validation or any other necessary checks on the input values

        const signupData = new FormData();
        signupData.append("firstname", firstname);
        signupData.append("lastname", lastname);
        signupData.append("email", email);
        signupData.append("password", password);
        signupData.append("gender", selectedGender);
        signupData.append("age", String(age));
        signupData.append("weight", String(weight));
        signupData.append("height", String(height));
        signupData.append("photo", {
          uri: photo,
          type: "image/jpeg",
          name: "profile.jpg",
        });
        console.log("signupData", signupData);

        const response = await signup(signupData).unwrap();

        // Handle successful registration response
        console.log("Registration successful:", response);

        // Navigate to another screen or perform any other necessary action
      } catch (error) {
        // Handle registration error
        console.log("Registration error:", error);
        setEmailError(error.data.message);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied to access media library");
      return;
    }

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
        <Image
          style={styles.avatar}
          source={require("../../assets/logo.jpg")}
        />
      </View>
      <ScrollView
        style={styles.formScrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.subTitle}>Create Your new Account</Text>
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="Enter your Firstname"
            keyboardType="default"
            value={formData.firstname}
            onChangeText={(text) => handleInputChange("firstname", text)}
            style={[
              styles.input,
              validationErrors.firstname && styles.inputError,
            ]}
          />
          {validationErrors.firstname && (
            <Text style={styles.errorText}>{validationErrors.firstname}</Text>
          )}

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Enter your Lastname"
            keyboardType="default"
            value={formData.lastname}
            onChangeText={(text) => handleInputChange("lastname", text)}
            style={[
              styles.input,
              validationErrors.lastname && styles.inputError,
            ]}
          />
          {validationErrors.lastname && (
            <Text style={styles.errorText}>{validationErrors.lastname}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            style={[styles.input, validationErrors.email && styles.inputError]}
          />
          {validationErrors.email && (
            <Text style={styles.errorText}>{validationErrors.email}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            style={[
              styles.input,
              validationErrors.password && styles.inputError,
            ]}
          />
          {validationErrors.password && (
            <Text style={styles.errorText}>{validationErrors.password}</Text>
          )}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedGender === "male" && styles.radioButtonSelected,
              ]}
              onPress={() => handleGenderSelection("male")}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedGender === "male" && styles.radioTextSelected,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedGender === "female" && styles.radioButtonSelected,
              ]}
              onPress={() => handleGenderSelection("female")}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedGender === "female" && styles.radioTextSelected,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TextInput
            placeholder="Enter your Gender"
            keyboardType="default"
            value={formData.gender}
            onChangeText={(text) => handleInputChange("gender", text)}
            style={[styles.input, validationErrors.gender && styles.inputError]}
          /> */}
          {/* {validationErrors.gender && (
            <Text style={styles.errorText}>{validationErrors.gender}</Text>
          )} */}
          <Text style={styles.label}>Age</Text>

          <TextInput
            placeholder="Enter your Age"
            keyboardType="number-pad"
            value={formData.age} // Convert the value to a string
            onChangeText={(text) => handleInputChange("age", text)}
            style={[styles.input, validationErrors.age && styles.inputError]}
          />
          {validationErrors.age && (
            <Text style={styles.errorText}>{validationErrors.age}</Text>
          )}
          <Text style={styles.label}>Weight</Text>
          <TextInput
            placeholder="Enter your Weight"
            keyboardType="number-pad"
            value={formData.weight} // Convert the value to a string
            onChangeText={(text) => handleInputChange("weight", text)}
            style={[styles.input, validationErrors.weight && styles.inputError]}
          />
          {validationErrors.weight && (
            <Text style={styles.errorText}>{validationErrors.weight}</Text>
          )}
          <Text style={styles.label}>Height</Text>
          <TextInput
            placeholder="Enter your Height"
            keyboardType="number-pad"
            value={formData.height} // Convert the value to a string
            onChangeText={(text) => handleInputChange("height", text)}
            style={[styles.input, validationErrors.height && styles.inputError]}
          />
          {validationErrors.height && (
            <Text style={styles.errorText}>{validationErrors.height}</Text>
          )}

          <Text style={styles.label}>Photo</Text>
          <View style={styles.file}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.picktext}>Pick Image</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
          </View>
          {EmailError ? (
            <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
              {EmailError}
            </Text>
          ) : null}

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
    position: "relative",
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
    marginTop: 5,
    fontSize: 25,
    textAlign: "center",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
    textAlign: "center",
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
  },
  radioContainer: {
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    padding: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    padding: 3,
    backgroundColor: "#d6aeef",
  },
  radioText: {
    fontSize: 16,
    marginLeft: 5,
    color: "white",
  },
  radioButtonSelected: {
    backgroundColor: "#C276F0", // Customize the selected color as needed
    borderRadius: 5,
  },
  radioTextSelected: {
    color: "#ffffff", // Customize the selected text color as needed
  },
  file: {
    backgroundColor: "#EDE5F2",
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    width: 250,
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
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.0)", // Change the opacity value as needed
  },
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
export default RegistrationPage;
