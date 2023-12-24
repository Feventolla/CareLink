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
import { SvgContent } from "../../screens/svg_content/loginSvg";
const Forgotpassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleLogin = () => {
    // Handle the login logic here with formData
    console.log("forgot Form Data:", formData);

    navigation.navigate("OTP");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../../assets/logo.jpg")}
        />
        <Text style={styles.title}>Enter your email</Text>
        <Text style={styles.subTitle}>
          we will sent you an otp on your email address
        </Text>

        <SvgXml xml={SvgContent} height={300} width={700} style={styles.svg} />
      </View>
      <View style={styles.formScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
      </View>
      <View style={styles.bottombutton}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>send code</Text>
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
  forgot: {
    color: "blue",
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
  },
});

export default Forgotpassword;
