import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import { SvgXml } from "react-native-svg";
import { SvgContent } from "../../screens/svg_content/loginSvg";
import { useLoginMutation } from "../../services/Auth/auth-api";
import LanguageDropdown from "../common/langButton";

const Loginpage = ({ navigation }) => {
  const [signin, { isLoading }] = useLoginMutation();
  const [validationErrors, setErrors] = useState({});
  const [EmailError, setEmailError] = useState();

  const currentLanguage = useSelector((state) => state.auth.language);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const checkToken = async () => {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        navigation.navigate("MainApp");
      }
    };

    checkToken();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.signupContainer}>
          <ActivityIndicator size="large" color="#C276F0" />
          <Text>sigining in User...</Text>
        </View>

        <View style={styles.blurOverlay} />
      </View>
    );
  }

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

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await signin(formData).unwrap();
        await AsyncStorage.setItem("userData", JSON.stringify(response.value));
        navigation.navigate("MainApp");
      } catch (error) {
        setEmailError(error.message);
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
        <LanguageDropdown />

        <Text style={styles.title}>
          {currentLanguage.language === "en"
            ? "Login to your account"
            : "ወደ መለያዎ ይግቡ"}
        </Text>
        <SvgXml xml={SvgContent} height={300} width={700} style={styles.svg} />
      </View>
      {EmailError ? (
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
          {EmailError}
        </Text>
      ) : null}
      <View style={styles.formScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>
            {currentLanguage.language === "en" ? "Email" : "ኢሜይል"}
          </Text>
          <TextInput
            placeholder={
              currentLanguage.language === "en"
                ? "Enter your Email"
                : "ኢሜይል ያስገቡ"
            }
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            style={[styles.input, validationErrors.email && styles.inputError]}
          />
          {validationErrors.email && (
            <Text style={styles.errorText}>{validationErrors.email}</Text>
          )}
          <Text style={styles.label}>
            {currentLanguage.language === "en" ? "Password" : "የይለፍ ቃል"}
          </Text>
          <TextInput
            placeholder={
              currentLanguage.language === "en"
                ? "Enter your Password"
                : "የይለፍ ቃል ያስገቡ"
            }
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Forgot");
          }}
        >
          <Text style={styles.forgot}>
            {currentLanguage.language === "en"
              ? "forgot password?"
              : "የይለፍ ቃል ረስተዋል?"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottombutton}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {currentLanguage.language === "en" ? "Login" : "ግቡ"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.footerText}>
            {currentLanguage.language === "en"
              ? "Don't have an account"
              : "መለያ የለዎትም"}
            ?{" "}
            <Text style={styles.logincolor}>
              {currentLanguage.language === "en" ? "Register" : "ይመዝገቡ"}
            </Text>
          </Text>
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
  forgot: {
    color: "#f26f6f",
    textAlign: "right",
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
export default Loginpage;
