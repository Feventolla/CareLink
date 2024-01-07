import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const OnboardingPage2 = ({ navigation }) => {
  const handleSkipPress = () => {
    navigation.navigate("Onboarding_three");
  };

  const handleNextPress = () => {
    // Handle next button press
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.barsContainer}>
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_one")}
          />
          <TouchableOpacity style={[styles.bar, styles.activeBar]} />
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_three")}
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.careLinkText}>
          Chat<Text style={styles.linkText}>Bot</Text>
        </Text>
        <Text style={styles.subText}>Talk with our chatbot</Text>
      </View>

      <Image source={require("../../assets/image2.png")} style={styles.image} />

      <TouchableOpacity style={styles.nextButton} onPress={handleSkipPress}>
        <Icon name="arrow-forward" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    alignItems: "center",
    marginTop: 20,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    // position: 'absolute',
    bottom: 180,
    width: 10,
    height: 5,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeBar: {
    backgroundColor: "#C276F0",
  },
  skipButton: {
    position: "absolute",
    // top: 20,
    bottom: 95,
    right: 20,
  },
  skipText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    alignItems: "flex-start",
    bottom: 50,
    marginLeft: 20,
  },
  careLinkText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#C276F0",
    right: 100,
  },
  linkText: {
    color: "black",
  },
  subText: {
    fontSize: 20,
    color: "black",
    right: 95,
    fontWeight: "bold",
  },
  image: {
    marginTop: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#C276F0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  nextButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default OnboardingPage2;
