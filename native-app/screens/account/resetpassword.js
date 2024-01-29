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
import { SvgXml } from "react-native-svg";
import { SvgContent } from "../../screens/svg_content/resetSvg";
import { useResetMutation } from "../../services/Auth/auth-api";

const Resetpassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [reset, { isLoading }] = useResetMutation();
  const [error, setError] = useState();
  const [validationErrors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const validateForm = () => {
    const newErrors = {};
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

  const handleLogin = async () => {
    if (validateForm()) {
      console.log("reset Form Data:", formData);
      try {
        const response = await reset(formData).unwrap();

        // Handle successful registration response
        console.log("password reset successfully:", response);

        if (response.isSuccess === true) {
          navigation.navigate("Signin");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        // Handle registration error
        console.log("reset error:", error);
        setError(error.data.message);
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../../assets/logo.jpg")}
        />
        <Text style={styles.title}>Reset your password</Text>
        <SvgXml xml={SvgContent} height={250} width={600} style={styles.svg} />
      </View>
      {error ? (
        <Text
          style={{
            color: "red",
            fontSize: 20,
            textAlign: "center",
            backgroundColor: "white",
            height: 40,
            borderRadius: 30,
          }}
        >
          {error}
        </Text>
      ) : null}
      <View style={styles.formScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
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

          <Text style={styles.label}>New Password</Text>
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
        </View>
      </View>
      <View style={styles.bottombutton}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 20,
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
  forgot: {
    color: "blue",
    textAlign: "right",
  },

  button: {
    backgroundColor: "#C276F0",
    padding: 10,
    marginTop: 80,
    borderRadius: 7,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
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
  },
});
export default Resetpassword;
