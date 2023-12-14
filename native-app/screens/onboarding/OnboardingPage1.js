import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const OnboardingPage1 = ({ navigation }) => {
  const handleSkipPress = () => {
    navigation.navigate("Onboarding_two");
  };

  const handleNextPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.barsContainer}>
          <TouchableOpacity style={[styles.bar, styles.activeBar]} />
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_two")}
          />
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_three")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.careLinkText}>
          Care<Text style={styles.linkText}>Link</Text>
        </Text>
        <Text style={styles.subText}>Find hospitals near you</Text>
      </View>

      <Image source={require("../../assets/image1.png")} style={styles.image} />

      <TouchableOpacity style={styles.nextButton} onPress={handleSkipPress}>
        <View style={styles.nextButtonContent}>
          <Icon name="arrow-forward" size={25} color="white" />
        </View>
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
    bottom: 100,
    width: 90,
    height: 5,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeBar: {
    backgroundColor: "#C276F0",
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

export default OnboardingPage1;
