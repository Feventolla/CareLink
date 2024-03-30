import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { SvgContent } from "../svg_content/otpSvg";
import { useRoute } from "@react-navigation/native";
import { useOtpMutation } from "../../services/Auth/auth-api";

const OTPVerificationPage = ({ navigation }) => {
  const [codeOtp, { isLoading }] = useOtpMutation();
  const [error, setError] = useState();
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store OTP digits
  const otpInputRefs = Array(4).fill(React.createRef());
  const route = useRoute();
  const { email } = route.params;
  console.log("passed email", email);
  // const [formData, setFormData] = useState({
  //   otp: "",
  // });

  // const handleInputChange = (field, value) => {
  //   setFormData((prevData) => ({ ...prevData, [field]: value }));
  // };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.signupContainer}>
          <ActivityIndicator size="large" color="#C276F0" />
          <Text>checking Entered OTP...</Text>
        </View>

        <View style={styles.blurOverlay} />
      </View>
    );
  }

  const handleInputChange = (index, value) => {
    // Update OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field, if available
    if (value && index < otp.length - 1) {
      otpInputRefs[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    // Move to the previous input field, if available
    if (index > 0) {
      otpInputRefs[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const prevOtp = otp.join("");
    const enteredotp = parseInt(prevOtp, 10);

    console.log("otp formdata", enteredotp);
    try {
      const response = await codeOtp({ otp: enteredotp, email: email });

      // Handle successful registration response
      console.log("otp entered successful:", response);

      if (response.data.isSuccess === true) {
        navigation.navigate("Reset");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      // Handle registration error
      console.log("otpcode error:", error);
      setError(error.data.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../../assets/logo.jpg")}
        />
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subTitle}>
          We've sent an otp code to the email on your device
        </Text>
        <Image
          style={styles.image}
          height={150}
          width={400}
          source={require("../../assets/email-sent.png")}
        />
        {/* <SvgXml xml={SvgContent} height={150} width={400} style={styles.svg} /> */}
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
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (otpInputRefs[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            placeholder="-"
            onChangeText={(value) => handleInputChange(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.footerText}>
          Didn't receive a code?{" "}
          <Text style={styles.logincolor}>Resend code</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
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
  image: {
    marginTop: 20,
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
    marginBottom: 20,
    margin: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 150,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 20,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#C276F0",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
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

export default OTPVerificationPage;
